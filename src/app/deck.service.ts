import { Injectable } from '@angular/core';
import { of, Observable, Observer, Subject } from 'rxjs';
import { City } from './City';
import { Cities } from './constants';

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    private deck: Object[];
    private currentPile: Object;

    private CityObjs: Object;

    private currentEpidemic: number;
    private epidemicIndexChange: Subject<number>;
    private index: number;

    constructor() {
        this.CityObjs = this.initCities();
        this.deck = [this.initDeck()];
        this.currentPile = {...this.initNewPile(), prevTotal: this.deck[0]['total']};
        this.currentEpidemic = 0;
        this.index = 0;
        this.epidemicIndexChange = new Subject<number>();
    }

    getDeck() : Observable<Object[]> {
        return of(this.deck);
    }

    getCurrentEpidemic() : Subject<number> {
        return this.epidemicIndexChange;
    }

    initDeck() : Object {
        let initalDeck = {total: 0};
        Cities.forEach((city) => {
            let cityTotal = this.CityObjs[city].getTotalInDeck();
            initalDeck[city] = cityTotal;
            initalDeck['total'] += cityTotal;
        });
        return initalDeck;
    }

    initNewPile() : Object {
        let pile = {total: 0};
        Cities.forEach(city => {
            pile[city] = 0;
        });
        return pile;
    }

    drawCard(city : string) : void {
        if (this.deck[this.currentEpidemic][city] === 0) {
            return;
        }
        this.currentPile[city]++;
        this.currentPile['total']++;

        this.deck[this.currentEpidemic][city]--;
        this.deck[this.currentEpidemic]['total']--;

        if (this.deck[this.currentEpidemic]['total'] === 0) {
            this.deck.splice(this.currentEpidemic, 1);
            this.currentEpidemic--;
        }
    }

    getNumDrawnForCity(city : string) : number {
        return this.currentPile[city];
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
        let prevTotal = this.currentPile['total'];
        this.currentEpidemic++;
        this.epidemicIndexChange.next(this.currentEpidemic);
        this.deck.push(this.currentPile);
        this.currentPile = {...this.initNewPile(), prevTotal: prevTotal};
    }

    getChanceToDraw(city : string) : number {
        let index = this.currentEpidemic;
        let cardsInPile = this.deck[this.currentEpidemic][city];
        let deckTotal = this.deck[index]['total'];
        return +((cardsInPile / deckTotal) * 100).toFixed(2);
    }

    getNumInPile(city: string) : number {
        return this.deck[this.currentEpidemic][city];
    }
    
}
