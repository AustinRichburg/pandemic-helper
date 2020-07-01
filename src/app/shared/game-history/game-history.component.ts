import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/deck.service';

@Component({
    selector: 'app-game-history',
    templateUrl: './game-history.component.html',
    styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

    gameHistory: string[];

    constructor(private deck: DeckService) { }

    ngOnInit() {
        this.deck.getGameHistory().subscribe(
            (gameHistory) => { this.gameHistory = gameHistory }
        );
    }

}
