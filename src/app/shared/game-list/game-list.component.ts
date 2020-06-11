import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

    localOptions: Object = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    constructor(public dialogRef: MatDialogRef<GameListComponent>,
        @Inject(MAT_DIALOG_DATA) public gameList: DialogData[],
        public dialog: MatDialog,
        private deck: DeckService) { }

    ngOnInit() { }

    loadGame(deck: string) : void {
        this.deck.loadNewDeck(deck);
    }

    format(date: string) : string {
        let d = new Date(date);
        return d.toLocaleDateString(undefined, this.localOptions) + ' ' + d.toLocaleTimeString();
    }

}

export interface DialogData {
    name: string,
    date: string
}
