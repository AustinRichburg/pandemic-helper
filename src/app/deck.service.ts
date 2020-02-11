import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { City } from './City';
import { Cities } from './constants';

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    private deck: Object[];
    private CityObjs: Object;
    private currentEpidemic: number;

    constructor() {
        this.CityObjs = this.initCities();
        this.deck = this.initDeck();
        this.currentEpidemic = 1;
    }

    getDeck() : Observable<Object[]> {
        return of(this.deck);
    }

    initDeck() : Object[] {
        let initalDeck = {total: 0};
        Cities.forEach((city) => {
            let cityTotal = this.CityObjs[city].getTotalInDeck();
            initalDeck[city] = cityTotal;
            initalDeck['total'] += cityTotal;
        });
        return [initalDeck, {...this.initNewPile(), prevTotal: initalDeck.total}];
    }

    initNewPile() : Object {
        let pile = {total: 0};
        Cities.forEach(city => {
            pile[city] = 0;
        });
        return pile;
    }

    drawCard(city : string) : void {
        if (this.deck[this.currentEpidemic - 1][city] === 0) {
            return;
        }
        this.deck[this.currentEpidemic][city]++;
        this.deck[this.currentEpidemic]['total']++;

        this.deck[this.currentEpidemic - 1][city]--;
        this.deck[this.currentEpidemic - 1]['total']--;

        if (this.deck[this.currentEpidemic - 1]['total'] === 0) {
            this.deck.splice(this.currentEpidemic - 1, 1);
            this.currentEpidemic--;
        }
    }

    getCurrentEpidemic() : Observable<number> {
        return of(this.currentEpidemic);
    }

    getNumDrawnForCity(city : string) : number {
        return this.deck[this.currentEpidemic][city];
    }

    getCity(city : string) : City {
        return this.CityObjs[city];
    }

    initCities() : Object {
        let cityObjs = {};
        Cities.forEach(city => {
            cityObjs[city] = new City(city);
        });
        return cityObjs;
    }

    epidemic() : void {
        let prevTotal = this.deck[this.currentEpidemic]['total'];
        this.currentEpidemic++;
        this.deck.push({...this.initNewPile(), prevTotal: prevTotal});
    }

    getChanceToDraw(city : string) : number {
        let index = this.currentEpidemic;
        let cardsInPile = 0
        if (this.currentEpidemic === 0) {
            cardsInPile = this.CityObjs[city].getTotalInDeck();
        } else {
            cardsInPile = this.deck[index - 1][city];
        }
        let deckTotal = this.deck[index]['prevTotal'];
        return +((cardsInPile / deckTotal) * 100).toFixed(2);
    }

    getNumInPile(city: string) : number {
        return this.deck[this.currentEpidemic - 1][city];
    }
}
