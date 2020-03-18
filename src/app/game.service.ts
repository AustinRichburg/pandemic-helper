import { Injectable } from '@angular/core';
import { Rate } from './constants';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private epidemic: number;

    constructor() {
        this.epidemic = 0;
    }

    /**
     * Begins a new game.
     */
    public newGame() : void {
        this.epidemic = 0;
    }

    /**
     * Decides if the game has ended.
     */
    // public isGameOver() : boolean {
    //     return false;
    // }

    public getDrawRate() : number {
        return Rate[this.epidemic];
    }

}
