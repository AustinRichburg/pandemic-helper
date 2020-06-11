import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Cities, Rate } from './constants';
import { City } from './City';

/**
 * This is the service that handles all aspects regarding the status of the game and deck. This is the single
 * source of truth in regards to the deck and all indexes.
 */

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    /* The deck that contains each city of the game as a City object. */
    private deck: Object;

    /* The total amount of cards that were drawn during each past epidemic round. */
    private totals: number[];

    /* The amount of cards drawn during the current epidemic round. */
    private currTotal: number;

    /** The index used for the totals array, and subscribed to by all cities so that it can be used for their
    *   individual totals. */
    private index: BehaviorSubject<number>;

    /* The current epidemic round. */
    private epidemicIndex: number;

    constructor() {
        this.index = new BehaviorSubject(0);
        this.newGame();
    }

    /**
     * Initializes the deck, setting the total of cards and creating each City.
     * @return Object The newly created deck.
     */
    private initDeck() : Object {
        let total = 0;
        let deck = {};

        for (let city of Cities) {
            deck[city] = new City(city, this);
            total += 3;
        }
        this.totals[0] = total;
        return deck;
    }

    /**
     * Decides if the game has ended. Game ends when the number of epidemic rounds exceeds the limit.
     * @return boolean Whether the game is over or not.
     */
    public isGameOver() : boolean {
        let gameOver = false;

        if (this.epidemicIndex >= Rate.length) {
            gameOver = true;
        }

        return gameOver;
    }

    /**
     * Logic for the card that was drawn. Increments current totals and decrements previous totals.
     * @param name The name of the city that was drawn.
     */
    public drawCard(name: string) : void {

        if (!this.deck[name].draw(this.index)) {
            return;
        }

        // Handle the overall totals for the deck
        this.currTotal++;
        this.totals[this.index.value]--;

        // If this was the last card in the pile for a round, decrement the index so we can go back to the pile before that one.
        if (this.totals[this.index.value] === 0) {
            this.index.next(this.index.value - 1);
        }
    }

    /**
     * Handles the deck in the event of an epidemic. It increases the deck indexes and updates the totals,
     * past and present. It is possible for two epidemics to get drawn back-to-back, so there is logic to handle
     * that as well.
     */
    public epidemic() : boolean {
        this.epidemicIndex++;

        if (this.isGameOver()) {
            return true;
        }

        // In the unlikely event of a back-to-back epidemic, don't do anything
        if (this.currTotal === 0) {
            return;
        }

        // Increment index
        this.index.next(this.index.value + 1);

        // Add the total of cards drawn this round to the totals array
        this.totals[this.index.value] = this.currTotal;
        this.currTotal = 0;

        // Add the number of cities drawn this round to the past drawn array
        for (let city of Cities) {
            this.deck[city].handleEpidemic();
        }
    }

    /**
     * Logic to reset all service variables for a new game.
     */
    public newGame() : void {
        this.index.next(0);
        this.totals = [].fill(0, Rate.length);
        this.currTotal = 0;
        this.epidemicIndex = 0;

        this.deck = this.initDeck();
    }

    /**
     * Adds a new note for a city.
     * @param city The name of the city.
     * @param note The note to add.
     */
    public addNote(city: string, note: string) : void {
        this.deck[city].notes.push(note);
    }

    /**
     * Deletes a note from a city.
     * @param city The name of the city.
     * @param index The index of the note to delete.
     */
    public deleteNote(city: string, index: number) : void {
        this.deck[city].notes.splice(index, 1);
    }

    /**
     * Turns the game information into a string that can be saved in the back-end to save a game's progress.
     * @return string The string form of the game information.
     */
    public toString() : string {
        let citiesArray = [];
        for (let city of Cities) {
            citiesArray.push(this.deck[city].toObject());
        }
        let gameInfo = {
            deck: citiesArray,
            index: this.index.value,
            totals: this.totals,
            currTotal: this.currTotal,
            epidemicIndex: this.epidemicIndex
        };
        return JSON.stringify(gameInfo);
    }

    /**
     * Accepts a string of information about a saved game and turns it into an actual game.
     * @param deck The string information about a deck.
     */
    public loadNewDeck(deck: string) : void {
        let loaded = JSON.parse(deck);
        for (let city of loaded.deck) {
            this.deck[city.name].setLoadedValues(city);
        }
        this.index.next(loaded.index);
        this.totals = loaded.totals;
        this.currTotal - loaded.currTotal;
        this.epidemicIndex = loaded.epidemicIndex;
    }

    /**
     * Gets the total of cards drawn from the last epidemic round.
     * @return number The number of cards drawn in the last epidemic round.
     */
    public getLastTotal() : number {
        return this.totals[this.index.value];
    }

    /**
     * Gets the current epidemic round.
     * @return number The epidemic round.
     */
    public getEpidemic() : number {
        return this.epidemicIndex;
    }

    /**
     * Gets the index for the totals array for each city.
     * @return BehaviorSubject<number> The Behavior Subject that the cities subscribe to.
     */
    public getIndex() : BehaviorSubject<number> {
        return this.index;
    }

    /**
     * Gets the deck as an observable so the client tables can be updated as changes occur.
     * @return Observable<Object[]> The observable that the material tables subscribe to.
     */
    public getDeck() : Observable<Object[]> {
        return of(Object.values(this.deck).filter((city) => typeof city === 'object' && city.hasOwnProperty('name')));
    }

    /**
     * Gets the user created notes for a given city.
     * @param city The name of the city to get the notes for.
     * @return string[] The array of notes.
     */
    public getNotes(city: string) : string[] {
        return this.deck[city].notes;
    }
    
}
