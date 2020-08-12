import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-game-over-modal',
    templateUrl: './game-over-modal.component.html',
    styleUrls: ['./game-over-modal.component.scss']
})
export class GameOverModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GameOverModalComponent>) { }

    ngOnInit() { }

    newGame() {
        this.dialogRef.close(true);
    }

}
