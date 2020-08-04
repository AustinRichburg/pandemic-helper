import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeckService } from 'src/app/deck.service';

@Component({
    selector: 'app-game-over-modal',
    templateUrl: './game-over-modal.component.html',
    styleUrls: ['./game-over-modal.component.scss']
})
export class GameOverModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GameOverModalComponent>,
              private deck: DeckService) { }

    ngOnInit() {
    }

    newGame() {
        this.deck.newGame();
        this.dialogRef.close();
    }

}
