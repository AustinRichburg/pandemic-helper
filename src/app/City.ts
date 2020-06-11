import { CityInterface } from './models/city';
import { DeckService } from './deck.service';
import { GameProgress } from './models/gameProgress';

/**
 * The class that represents each City in the game of Pandemic. This class makes up the deck in the DeckService,
 * and keeps track of various statistics used during the game.
 */
export class City implements CityInterface {

    /* The name of the city. */
    name: string;

    /* The number of cards for this city in the deck. */
    numberInDeck: number;

    /* The total amount of cards for this city drawn during each round. */
    totals: number[];

    /* The amount of times this card has been drawn in this round. */
    currDrawn: number;

    /* The user created notes for this city. */
    notes: string[];

    /* The index used for the totals array. */
    index: number;

    /* The deck service used to get general deck info. */
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

    /**
     * Returns the chance that a card will be drawn in the current epidemic round.
     */
    public chance() : string {
        return ((this.totals[this.index] / this.deck.getLastTotal()) * 100).toFixed(2);
    }

    /**
     * Returns the amount of cards drawn in the last epidemic round.
     */
    public inDeck() : number {
        return this.totals[this.index];
    }

    /**
     * Simulates drawing a card for the city. Increments and decrements totals as needed. Returns TRUE if the card
     * was drawn, FALSE if the card should not have been drawn. (eg. there should be no more cards in the current pile)
     */
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

    /**
     * Handles the epidemic event for this card. This will append the current drawn number to the totals
     * array and reset it.
     */
    public handleEpidemic() : void {
        this.totals.push(this.currDrawn);
        this.currDrawn = 0;
    }

    /**
     * Sets the values for a city from values loaded in by a new game.
     * @param city The object that loaded values are in.
     */
    public setLoadedValues(city: GameProgress) : void {
        this.totals = city.totals
        this.currDrawn = city.currDrawn;
        this.notes = city.notes;
    }

    /**
     * Returns an object with the relevant information that can be used to load the game later.
     */
    public toObject() : GameProgress {
        return {
            name: this.name,
            totals: this.totals,
            currDrawn: this.currDrawn,
            notes: this.notes
        };
    }

}