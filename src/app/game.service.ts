import { Injectable } from '@angular/core';
import { Rate } from './constants';
import { DeckService } from './deck.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private epidemicIndex: number;

    constructor(private deckService: DeckService) {
        this.epidemicIndex = 0;
    }

    /**
     * Begins a new game.
     */
    public newGame() : void {
        this.epidemicIndex = 0;
        this.deckService.newGame();
    }

    /**
     * Decides if the game has ended.
     */
    public isGameOver() : boolean {
        let gameOver = false;

        if (this.epidemicIndex >= Rate.length) {
            gameOver = true;
        }

        return gameOver;
    }

    public getDrawRate() : number {
        return Rate[this.epidemicIndex];
    }

    public getEpidemic() : number {
        return this.epidemicIndex;
    }

    public epidemic() : boolean {
        this.epidemicIndex++;

        if (this.isGameOver()) {
            return true;
        }

        this.deckService.epidemic();

        return false;
    }

}
