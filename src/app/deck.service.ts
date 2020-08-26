import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { WebsocketConfigService } from './websocketConfig.service';
import { Game } from './models/game';

/**
 * This is the service that handles all aspects regarding the status of the game and deck on the client side. The game
 * logic is on the server, so this service is mainly used to handle the two way communication with client and server
 * via websockets.
 */

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    /* Websocket used to talk to the server. */
    private gameSocket: WebSocket;

    /* Boolean used as a signal to indicate to subscribers that a change to the game has occurred. */
    private gameChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /* The deck that contains each city of the game as a City object. */
    private deck: Object;

    /* The current epidemic round. */
    private epidemicIndex: number;

    /* Array of all events in the game. */
    private gameHistory: string[];

    /* Array of all other players connected to the same websocket group. */
    private playerList: Object;

    /* Boolean used as an indicator to subscribers that the game is over. */
    private isGameOver: boolean = false;

    private gameName: string = '';

    /**
     * On creating the service, subscribe to the game ID. Once we have a game ID, create a new websocket using that ID.
     * @param wsConfig Websocket config service that holds the game ID.
     */
    constructor(private wsConfig: WebsocketConfigService) {
        wsConfig.getGameId().subscribe(
            gameId => {
                if (!gameId) return;
                this.connectToSocket(gameId);
            }
        );
    }

    /**
     * Logic to connect to a websocket if the user is signed in.
     * @param gameId The game ID used to create a unique Django Channels group (in other words, a new game)
     */
    private connectToSocket(gameId: string) : void {
        const token = JSON.parse(localStorage.getItem('user')).token || null;

        if (!token) return;

        // Create the new websocket.
        this.gameSocket = new WebSocket(
            'ws://'
            + 'localhost:8000'
            + '/ws/remote/'
            + gameId + '?token=' + token
        );

        // Executes when the socket has successfully opened.
        this.gameSocket.onopen = (e) => {
            this.playerList = [];
            this.gameName = '';
        };

        // Executes when the socket sends data back.
        this.gameSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            switch (data.type) {
                case 'update_game':
                    this.updateGame(data.data);
                    break;
                case 'draw':
                    break;
                case 'epidemic':
                    break;
                case 'player_list':
                    this.updatePlayerlist(data.data)
                    break;
                case 'game_setup':
                    this.updateGame(data.deck);
                    this.gameName = data.name;
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
                    break;
                case 'save':
                    console.log('Save ' + data.data ? 'successful.' : 'failed.');
                    break;
                case 'load':
                    break;
                case 'new_game':
                    break;
                case 'name':
                    this.gameName = data.data;
                    break;
                case 'unauthorized':
                    console.log(data.type);
                    break;
                default:
                    console.error('Command not recognized.');
                    break;
            }

            this.gameChange.next(true);
        };

        // Executes when the socket has successfully closed.
        this.gameSocket.onclose = (e) => {
            this.gameSocket = null;
        };
    }

    /**
     * Updates the game with any new values that have occurred.
     * @param game Updated game values.
     */
    private updateGame(game: Game) {
        this.deck = game.deck;
        this.epidemicIndex = game.epidemic_index;
        this.gameHistory = game.game_history;
    }

    /**
     * Close the websocket.
     */
    public leaveRemoteGame() : void {
        this.gameSocket.close();
    }

    /**
     * Simulates drawing a card.
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
     * Handles the deck in the event of an epidemic.
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
     * Tell the group websocket to load an existing game.
     * @param id ID of the game to load.
     */
    public loadGame(id: string) : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'load',
                data: id
            }));
        }
    }

    /**
     * Tell the game websocket to save the current game.
     */
    public saveGame() : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'save',
                name: this.gameName
            }));
        }
    }

    public newGame() : void {
        if (this.gameSocket !== undefined) {
            this.gameSocket.send(JSON.stringify({
                type: 'new_game'
            }));
        }
    }

    private updatePlayerlist(list: Object) : void {
        const prevLength = Object.keys(this.playerList).length;
        const newLength = Object.keys(list).length;
        if (prevLength > newLength) {
            
        } else if (prevLength < newLength) {
            
        }

        this.playerList = list;
    }

    /* =========================== Getter / Observable Functions =========================== */

    /**
     * Gets the current epidemic round.
     */
    public getEpidemic() : Observable<number> {
        return of(this.epidemicIndex);
    }

    /**
     * Gets the deck as an observable so the client tables can be updated as changes occur.
     */
    public getDeck() : Observable<Object[]> {
        return of(Object.values(this.deck));
    }

    /**
     * Gets the user created notes for a given city.
     * @param city The name of the city to get the notes for.
     */
    public getNotes(city: string) : Observable<string[]> {
        return of(this.deck[city].notes);
    }

    /**
     * Function used to subscribe to a boolean indicating if the game status has changed.
     */
    public isGameChange() : BehaviorSubject<boolean> {
        return this.gameChange;
    }

    /**
     * Function used to observe if a game has ended.
     */
    public getGameOver() : Observable<boolean> {
        return of(this.isGameOver);
    }

    /**
     * Function to subscribe to the game history.
     */
    public getGameHistory() : Observable<string[]> {
        return of(this.gameHistory);
    }

    /**
     * Function to subscribe to the player list of the current connected game.
     */
    public getPlayers() : Observable<Object> {
        return of(this.playerList);
    }

    public getGameName() : Observable<string> {
        return of(this.gameName);
    }

    public setGameName(newName: string) : void {
        if (newName === this.gameName) return;
        this.gameName = newName;
        this.gameSocket.send(JSON.stringify({
            type: 'name',
            data: this.gameName
        }));
    }
    
}
