import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../deck.service';
import { GameService } from '../../game.service';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit {

    deck: Object;
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions'];
    isGameOver: boolean;

    constructor(private deckService: DeckService,
                private gameService: GameService,
                public dialog: MatDialog) {}

    ngOnInit() {
        this.isGameOver = false;
        this.deckService.getDeck().subscribe(deck => this.deck = deck)
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

}
