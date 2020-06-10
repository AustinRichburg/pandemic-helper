import { Component, OnInit, ViewChild } from '@angular/core';
import { DeckService } from '../../deck.service';
import { GameService } from '../../game.service';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';

import { NotesComponent } from 'src/app/shared/notes/notes.component';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit {

    deck: Object[];
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions', 'notes'];
    isGameOver: boolean;
    tableSource: MatTableDataSource<Object>;
    title: string = "Pandemic Helper - Vanilla";

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private deckService: DeckService,
                private gameService: GameService,
                private titleService: Title,
                private auth: AuthService,
                public dialog: MatDialog) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.isGameOver = false;
        this.deckService.getDeck().subscribe(deck => this.deck = deck);
        this.tableSource = new MatTableDataSource(this.deck);
        this.tableSource.sort = this.sort;
        this.tableSource.sortingDataAccessor = this.sortFunc;
    }

    draw(name: string) {
        this.deckService.drawCard(name);
    }

    epidemic() : void {
        this.isGameOver = this.gameService.epidemic();
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
        const config = new MatDialogConfig();
        config.width = '50%';
        config.data = {
            name: city,
            notes: this.deckService.getNotes(city)
        };
        this.dialog.open(NotesComponent, config);
    }

    startRemoteGame() {
        console.log("remote game started");
        this.auth.startRemoteGame();
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
        this.auth.getGameList();
    }

    private dec2hex (dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private generateId (len: number) : string {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }

}
