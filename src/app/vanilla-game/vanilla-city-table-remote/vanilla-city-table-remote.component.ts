import { Component, OnInit, ViewChild } from '@angular/core';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { GameListComponent } from '../../shared/game-list/game-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';

import { NotesComponent } from 'src/app/shared/notes/notes.component';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeckRemoteService } from 'src/app/deck-remote.service';

@Component({
    selector: 'app-vanilla-city-table-remote',
    templateUrl: './vanilla-city-table-remote.component.html',
    styleUrls: ['./vanilla-city-table-remote.component.scss']
})
export class VanillaCityTableRemoteComponent implements OnInit {

    deck: MatTableDataSource<Object>;
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions', 'notes'];
    isGameOver: boolean;
    title: string = "Pandemic Helper - Vanilla";
    playerList: string[];
    isWebsocketOpen: boolean;
    gameId: string;
    isGameMaster: boolean;
    state: Object;

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private deckService: DeckRemoteService,
                private titleService: Title,
                private auth: AuthService,
                public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {
                    this.state = this.router.getCurrentNavigation().extras.state;
                }

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.isGameOver = false;
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        this.isGameMaster = this.state && this.state.hasOwnProperty('isGM') && this.state['isGM'];
        this.deckService.remoteGame(this.gameId, this.isGameMaster);

        this.deckService.getDeck().subscribe(
            (deck) => {
                this.deck = new MatTableDataSource(deck);
                this.deck.sort = this.sort;
                this.deck.sortingDataAccessor = this.sortFunc;
            }
        );

        this.deckService.getIsWebsocketOpen().subscribe(
            (websocketOpen) => this.isWebsocketOpen = websocketOpen
        );
        
        this.deckService.getPlayers().subscribe(
            (players) => this.playerList = players
        );

        this.deckService.getIsGM().subscribe(
            (isGM) => this.isGameMaster = isGM
        );
    }

    draw(name: string) {
        this.deckService.drawCard(name);
    }

    epidemic() : void {
        this.isGameOver = this.deckService.epidemic();
        if (this.isGameOver) {
            const config = new MatDialogConfig();
            this.dialog.open(GameOverModalComponent, config);
        }
    }

    sortFunc(item, header) {
        switch (header) {
            case 'name': return item.name;
            case 'chance': return parseFloat(item.chance(item));
            case 'totalOfCard': return item.inDeck(item);
            case 'numInPiles': return item.currDrawn;
        }
    }

    openNotes(city: string) {
        const success = (res) => {
            console.log(res);
        };

        const config = new MatDialogConfig();
        config.width = '50%';
        config.data = {
            name: city,
            notes: this.deckService.getNotes(city),
            deckService: this.deckService
        };
        let dialogRef = this.dialog.open(NotesComponent, config);
        dialogRef.afterClosed().subscribe(
            res => success(res)
        );
    }

    leaveRemoteGame() {
        this.deckService.leaveRemoteGame();
        this.router.navigate(['/vanilla']);
    }

    saveGame() {
        const gameInfo = this.deckService.toString();
        const game = {
            id: this.generateId(30),
            name: 'test',
            game: gameInfo
        }
        this.auth.saveGame(game);
    }

    loadGame() {
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
    private dec2hex (dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private generateId (len: number) : string {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }

}
