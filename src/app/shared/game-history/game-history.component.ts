import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/deck.service';
import { DeckRemoteService } from 'src/app/deck-remote.service';

@Component({
    selector: 'app-game-history',
    templateUrl: './game-history.component.html',
    styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

    gameHistory: string[] = [
        "Washington was drawn.",
        "New York was drawn.",
        "New York was drawn.",
        "New York was drawn.",
        "Epidemic 2 occured.",
        "Jacksonville was drawn.",
        "Paris was drawn.",
        "Jacksonville was drawn.",
        "Cairo was drawn.",
        "Washington was drawn.",
        "New York was drawn.",
        "New York was drawn.",
        "New York was drawn.",
        "Epidemic 2 occured.",
        "Jacksonville was drawn.",
        "Paris was drawn.",
        "Jacksonville was drawn.",
        "Cairo was drawn."
    ];

    constructor(private deck: DeckRemoteService) { }

    ngOnInit() {
        // this.deck.getGameHistory().subscribe(
        //     (gameHistory) => { this.gameHistory = gameHistory }
        // );
    }

}
