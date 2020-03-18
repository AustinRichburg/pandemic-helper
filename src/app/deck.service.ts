import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
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
        let self = this;

        this.totalsIndex = 0;
        this.totals = [].fill(0, Rate.length);
        this.currTotal = 0;

        this.deckIndex = 0;
        this.deck = this.initDeck();
    }

    private initDeck() : Object {
        let total = 0;
        let deck = {};

        for (let city of Cities) {
            deck[city] = {
                name: city,
                totalOfCard: 3,
                pastDrawn: [3],
                currDrawn: 0,
                chance: (self: Object) => {
                    return ((self['pastDrawn'][this.totalsIndex] / this.totals[this.totalsIndex]) * 100).toFixed(2);
                }
            };
            total += 3;
        }
        this.totals[0] = total;
        return deck;
    }

    public getDeck() : Observable<Object[]> {
        return of(Object.values(this.deck).filter((city) => typeof city === 'object' && city.hasOwnProperty('name')));
    }

    public drawCard(name: string) : void {
        this.deck[name].currDrawn++;
        this.deck[name].pastDrawn[this.deckIndex]--;

        this.currTotal++;
        this.totals[this.totalsIndex]--;
    }
    
}
