import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

    readonly dateOptions: Object = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    readonly timeOptions: Object = {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    }

    constructor(public dialogRef: MatDialogRef<GameListComponent>,
        @Inject(MAT_DIALOG_DATA) public gameList: DialogData[],
        public dialog: MatDialog,
        private deck: DeckService) { }

    ngOnInit() { }

    loadGame(id: string) : void {
        this.deck.loadGame(id);
        this.dialogRef.close(true);
    }

    format(date: string) : string {
        let d = new Date(date);
        return d.toLocaleDateString(undefined, this.dateOptions) + ' ' + d.toLocaleTimeString(undefined, this.timeOptions);
    }

}

interface DialogData {
    name: string,
    date: string
}
