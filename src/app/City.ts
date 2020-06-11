import { CityInterface } from './models/city';
import { DeckService } from './deck.service';

export class City implements CityInterface {

    name: string;
    numberInDeck: number;
    totals: number[];
    currDrawn: number;
    notes: string[];
    index: number;
    deck: DeckService;

    constructor(name: string, deck: DeckService) {
        this.name = name;
        this.numberInDeck = 3;
        this.totals = [3];
        this.currDrawn = 0;
        this.notes = [];
        this.deck = deck;
        deck.getIndex().subscribe(index => this.index = index);
    }

    public getName() : string {
        return this.name;
    }

    public chance() : string {
        return ((this.totals[this.index] / this.deck.getLastTotal()) * 100).toFixed(2);
    }

    public inDeck() {
        return this.totals[this.index];
    }

    public draw() : boolean {
        // If this card is no longer in the previous pile, a mistake was made somewhere along the way so return.
        if (this.totals[this.index] === 0) {
            return false;
        }

        // Handle the totals for the individual card
        this.currDrawn++;
        this.totals[this.index]--;
        return true;
    }

    public handleEpidemic() : void {
        this.totals[this.index] = this.currDrawn;
        this.currDrawn = 0;
    }

    public setLoadedValues(city: Object) {
        this.totals = city['totals'];
        this.currDrawn = city['currDrawn'];
        this.notes = city['notes'];
    }

    public toObject() {
        return {
            name: this.name,
            totals: this.totals,
            currDrawn: this.currDrawn,
            notes: this.notes
        };
    }

}