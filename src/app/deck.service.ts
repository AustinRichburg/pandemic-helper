import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { WebsocketConfigService } from './websocketConfig.service';

/**
 * This is the service that handles all aspects regarding the status of the game and deck. This is the single
 * source of truth in regards to the deck and all indexes.
 */

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    /* The deck that contains each city of the game as a City object. */
    protected deck: Object;

    /* The total amount of cards that were drawn during each past epidemic round. */
    protected totals: number[];

    /* The amount of cards drawn during the current epidemic round. */
    protected currTotal: number;

    /** The index used for the totals array, and subscribed to by all cities so that it can be used for their
    *   individual totals. */
    protected index: BehaviorSubject<number>;

    /* The current epidemic round. */
    protected epidemicIndex: number;

    protected gameHistory: string[];

    private isWebsocketOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private gameSocket: WebSocket;

    private playerList: string[];

    private gameChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private isGameOver: boolean = false;

    private gameId: string;

    constructor(private wsConfig: WebsocketConfigService) {
        wsConfig.getGameId().subscribe(
            gameId => {
                if (!gameId) return;
                if (this.gameSocket) this.gameSocket.close();
                this.connectToSocket(gameId);
            }
        );
    }

    private connectToSocket(gameId: string) : void {
        const token = JSON.parse(localStorage.getItem('user')).token || null;

        if (!token) return;

        this.gameId = gameId;

        // Create the new websocket.
        this.gameSocket = new WebSocket(
            'ws://'
            + 'localhost:8000'
            + '/ws/remote/'
            + gameId + '?token=' + token
        );

        this.playerList = [];

        // Executes when the socket has successfully opened.
        this.gameSocket.onopen = (e) => {
            this.isWebsocketOpen.next(true);
        };

        // Executes when the socket sends data back.
        this.gameSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            switch (data.type) {
                case 'player_list':
                    this.updatePlayers(data.data);
                    break;
                case 'update_game':
                    this.updateGame(data.data);
                    break;
                case 'add_note':
                    this.deck[data.data.city].notes.push(data.data.note);
                    break;
                case 'remove_note':
                    this.deck[data.data.city].notes.splice(data.data.index, 1);
                    break;
                case 'game_over':
                    this.isGameOver = true;
                    break;
                case 'close_game':
                    this.gameSocket.close();
                case 'save':
                    console.log('Save ' + data.data ? 'successful.' : 'failed.');
                    break;
                default:
                    console.error('Command not recognized.');
                    break;
            }

            this.gameChange.next(true);
        };

        // Executes when the socket has successfully closed.
        this.gameSocket.onclose = (e) => {
            this.isWebsocketOpen.next(false);
            this.gameSocket = null;
        };
    }

    public isGameChange() : BehaviorSubject<boolean> {
        return this.gameChange;
    }

    public getGameOver() : Observable<boolean> {
        return of(this.isGameOver);
    }

    private updateGame(game) {
        this.deck = game.deck;
        this.epidemicIndex = game.epidemic_index;
        this.gameHistory = game.game_history;
    }

    public leaveRemoteGame() : void {
        this.gameSocket.close();
    }

    public getIsWebsocketOpen() : BehaviorSubject<boolean> {
        return this.isWebsocketOpen;
    }

    public getPlayers() : Observable<string[]> {
        return of(this.playerList);
    }

    public updatePlayers(list: string[]) {
        this.playerList = list;
    }

    /**
     * Logic for the card that was drawn. Increments current totals and decrements previous totals.
     * @param name The name of the city that was drawn.
     */
    public drawCard(name: string) : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'draw',
                data: name
            }));
        }
    }

    /**
     * Handles the deck in the event of an epidemic. It increases the deck indexes and updates the totals,
     * past and present. It is possible for two epidemics to get drawn back-to-back, so there is logic to handle
     * that as well.
     */
    public epidemic() : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'epidemic'
            }));
        }
    }

    /**
     * Adds a new note for a city.
     * @param city The name of the city.
     * @param note The note to add.
     */
    public addNote(city: string, note: string) : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'add_note',
                data: {
                    city: city,
                    note: note
                }
            }));
        }
    }

    /**
     * Deletes a note from a city.
     * @param city The name of the city.
     * @param index The index of the note to delete.
     */
    public deleteNote(city: string, index: number) : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'remove_note',
                data: {
                    city: city,
                    index: index
                }
            }));
        }
    }

    /**
     * Accepts a string of information about a saved game and turns it into an actual game.
     * @param deck The string information about a deck.
     */
    // public loadNewDeck(deck: string) : boolean {
    //     let loaded = JSON.parse(deck);
    //     for (let city of loaded.deck) {
    //         this.deck[city.name].setLoadedValues(city);
    //     }
    //     this.index.next(loaded.index);
    //     this.totals = loaded.totals;
    //     this.currTotal - loaded.currTotal;
    //     this.epidemicIndex = loaded.epidemicIndex;
    //     return true;
    // }

    public loadGame(id: string) : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'load',
                data: id
            }));
        }
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
    public getEpidemic() : Observable<number> {
        return of(this.epidemicIndex);
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
        return of(Object.values(this.deck));
    }

    /**
     * Gets the user created notes for a given city.
     * @param city The name of the city to get the notes for.
     * @return string[] The array of notes.
     */
    public getNotes(city: string) : Observable<string[]> {
        return of(this.deck[city].notes);
    }

    public getGameHistory() : Observable<string[]> {
        return of(this.gameHistory);
    }

    public saveGame() : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'save'
            }));
        }
    }
    
}
