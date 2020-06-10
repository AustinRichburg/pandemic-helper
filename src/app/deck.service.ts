import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Cities, Rate } from './constants';

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    private deck: Object;
    private deckIndex: number;

    private totals: number[];
    private currTotal: number;
    private totalsIndex: number;

    constructor() {
        this.newGame();
    }

    private initDeck() : Object {
        let total = 0;
        let deck = {};

        for (let city of Cities) {
            deck[city] = {
                name: city,
                totalOfCard: 3,
                pastDrawn: [3].fill(0, 1, Rate.length),
                currDrawn: 0,
                chance: (self: Object) => {
                    return ((self['pastDrawn'][this.totalsIndex] / this.totals[this.totalsIndex]) * 100).toFixed(2);
                },
                inDeck: (self: Object) => {
                    return self['pastDrawn'][this.totalsIndex];
                },
                notes: []
            };
            total += 3;
        }
        this.totals[0] = total;
        return deck;
    }

    public getDeck() : Observable<Object[]> {
        return of(Object.values(this.deck).filter((city) => typeof city === 'object' && city.hasOwnProperty('name')));
    }

    /**
     * Logic for the card that was drawn. Increments current totals and decrements previous totals.
     * @param name The name of the city that was drawn.
     */
    public drawCard(name: string) : void {
        // If this card is no longer in the past pile, a mistake was made somewhere along the way so return.
        if (this.deck[name].pastDrawn[this.deckIndex] === 0) {
            return;
        }

        // Handle the totals for the individual card
        this.deck[name].currDrawn++;
        this.deck[name].pastDrawn[this.deckIndex]--;

        // Handle the overall totals for the deck
        this.currTotal++;
        this.totals[this.totalsIndex]--;

        // If this was the last card in the pile for a round, decrement the indexes so we can go back to the pile before that one.
        if (this.totals[this.totalsIndex] === 0) {
            this.totalsIndex--;
            this.deckIndex--;
        }
    }

    /**
     * Handles the deck in the event of an epidemic. It increases the deck indexes and updates the totals,
     * past and present. It is possible for two epidemics to get drawn back-to-back, so there is logic to handle
     * that as well.
     */
    public epidemic() : void {
        // In the unlikely event of a back-to-back epidemic, don't do anything
        if (this.currTotal === 0) {
            return;
        }

        // Increment indexes
        this.deckIndex++;
        this.totalsIndex++;

        // Add the total of cards drawn this round to the totals array
        this.totals[this.totalsIndex] = this.currTotal;
        this.currTotal = 0;

        // Add the number of cities drawn this round to the past drawn array
        for (let city of Cities) {
            this.deck[city].pastDrawn[this.deckIndex] = this.deck[city].currDrawn;
            this.deck[city].currDrawn = 0;
        }
    }

    /**
     * Logic to reset all service variables for a new game.
     */
    public newGame() {
        this.totalsIndex = 0;
        this.totals = [].fill(0, Rate.length);
        this.currTotal = 0;

        this.deckIndex = 0;
        this.deck = this.initDeck();
    }

    public getNotes(city: string) {
        return this.deck[city].notes;
    }

    public addNote(city: string, note: string) {
        this.deck[city].notes.push(note);
    }

    public deleteNote(city: string, index: number) {
        this.deck[city].notes.splice(index, 1);
    }

    public toString() : string {
        let gameInfo = {
            deck: this.deck,
            deckIndex: this.deckIndex,
            totals: this.totals,
            totalsIndex: this.totalsIndex,
            currTotal: this.currTotal
        };
        return JSON.stringify(gameInfo);
    }
    
}
