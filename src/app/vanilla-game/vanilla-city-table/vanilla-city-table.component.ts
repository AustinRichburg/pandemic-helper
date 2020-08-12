import { Component, OnInit, ViewChild, AfterViewInit, Injectable } from '@angular/core';
import { DeckService } from '../../deck.service';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { GameListComponent } from '../../shared/game-list/game-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';

import { NotesComponent } from 'src/app/shared/notes/notes.component';
import { AuthService } from 'src/app/auth.service';
import { JoinMultiComponent } from 'src/app/shared/join-multi/join-multi.component';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { WebsocketConfigService } from 'src/app/websocketConfig.service';


@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(SnackbarComponent, {static: true}) snackbar: SnackbarComponent;

    deck: MatTableDataSource<Object>;
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions', 'notes'];
    isGameOver: boolean;
    title: string = "Pandemic Helper - Vanilla";
    msg = "test";
    gameHistory: string[];
    epidemic_index: number;
    playerList: string[];

    constructor(private deckService: DeckService,
                private titleService: Title,
                private auth: AuthService,
                public dialog: MatDialog,
                private router: Router,
                private wsConfig: WebsocketConfigService) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.isGameOver = false;
        this.deckService.isGameChange().subscribe(
            (gameChange) => {
                if (gameChange) {
                    this.deckService.getDeck().subscribe(
                        (deck) => {
                            this.deck = new MatTableDataSource(deck);
                            this.deck.sort = this.sort;
                            this.deck.sortingDataAccessor = this.sortFunc;
                        }
                    );
                    this.deckService.getGameHistory().subscribe(
                        history => this.gameHistory = history
                    );
                    this.deckService.getEpidemic().subscribe(
                        index => this.epidemic_index = index
                    );
                    this.deckService.getGameOver().subscribe(
                        isGameOver => {
                            if (isGameOver) {
                                const config = new MatDialogConfig();
                                this.dialog.open(GameOverModalComponent, config);
                            }
                        }
                    );
                    this.deckService.getPlayers().subscribe(
                        playerList => this.playerList = playerList
                    );
                }
            }  
        );
    }

    ngAfterViewInit() {
        this.displaySnackbar = (msg: string) => { this.snackbar.displayMessage(msg) }
    }

    draw(name: string) {
        this.deckService.drawCard(name);
    }

    epidemic() : void {
        this.deckService.epidemic();
    }

    sortFunc(item, header) {
        switch (header) {
            case 'name': return item.name;
            case 'chance': return item.chance;
            case 'totalOfCard': return item.in_deck;
            case 'numInPiles': return item.curr_drawn;
        }
    }

    openNotes(city: any) {
        const config = new MatDialogConfig();
        config.width = '50%';
        config.data = {
            name: city.name,
            notes: this.deckService.getNotes(city.name),
            deckService: this.deckService
        };
        this.dialog.open(NotesComponent, config);
    }

    joinRemoteGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        const success = (res: any) => {
            if (res) {
                this.router.navigate(['/vanilla/' + res.id]);
                this.wsConfig.setGameId(res.id);
            } else {
                // logic to handle error joining game
            }
        };

        const config = new MatDialogConfig();
        config.width = '50%';
        let joinMultiRef = this.dialog.open(JoinMultiComponent, config);
        joinMultiRef.afterClosed().subscribe(
            result => success(result)
        );
    }

    saveGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        const gameInfo = this.deckService.toString();
        const game = {
            id: this.generateId(30),
            name: 'test',
            game: gameInfo
        }
        this.auth.saveGame(game).subscribe(
            res => this.displaySnackbar('Game saved.')
        );
    }

    loadGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }
        
        let gameList = [];
        let gameListSuccess = (res: any) => {
            gameList = res['data'];
            let config = new MatDialogConfig();
            config.data = gameList;
            this.dialog.open(GameListComponent, config);
        }

        this.auth.getGameList().subscribe(
            res => gameListSuccess(res)
        );
    }

    //TODO: move this to auth service
    // Logic to create unique game ID to identify saved games
    private dec2hex (dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private generateId (len: number) : string {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }

    displaySnackbar(msg: string) {
        return;
    }

}