import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeckRemoteService extends DeckService {

    private isWebsocketOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private gameSocket: WebSocket;

    private playerList: BehaviorSubject<string[]>;

    private isGameMaster: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        super();
    }

    public drawCard(name: string, received: boolean = false) : void {
        if (!this.isGameMaster.value) {
            return;
        }

        super.drawCard(name);

        if (this.gameSocket !== undefined && !received) {
            this.gameSocket.send(JSON.stringify({
                type: 'update_deck',
                data: name
            }));
        }
    }

    public epidemic() : boolean {
        return super.epidemic();
    }

    public remoteGame(groupId: string, isGM: boolean) : void {
        const token = JSON.parse(localStorage.getItem('user')).token || null;

        if (!token) return;

        // Create the new websocket.
        this.gameSocket = new WebSocket(
            'ws://'
            + 'localhost:8000'
            + '/ws/remote/'
            + groupId + '?token=' + token
        );

        this.playerList = new BehaviorSubject([]);

        // Executes when the socket has successfully opened.
        this.gameSocket.onopen = (e) => {
            this.isWebsocketOpen.next(true);
            this.isGameMaster.next(isGM);
        };

        // Executes when the socket sends data back.
        this.gameSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            switch (data.type) {
                case 'player_list':
                    this.updatePlayers(data.data);
                    break;
                case 'draw':
                    if (data.from === JSON.parse(localStorage.getItem('user')).username) break;
                    super.drawCard(data.data);
                    break;
                case 'add_note':
                    this.addNote(data.city, data.note, false);
                    break;
                case 'remove_note':
                    this.deleteNote(data.city, data.index, false);
                    break;
                case 'close_game':
                    this.gameSocket.close();
                default:
                    console.error('Command not recognized.');
                    break;
            }
        };

        // Executes when the socket has successfully closed.
        this.gameSocket.onclose = (e) => {
            this.isWebsocketOpen.next(false);
        };
    }

    public addNote(city: string, note: string, received: boolean = false) {
        super.addNote(city, note);

        if (this.gameSocket !== undefined && !received) {
            this.gameSocket.send(JSON.stringify({
                type: 'add_note',
                data: {
                    city: city,
                    note: note
                }
            }));
        }
    }

    public deleteNote(city: string, index: number, received: boolean = false) {
        super.deleteNote(city, index);

        if (this.gameSocket !== undefined && !received) {
            this.gameSocket.send(JSON.stringify({
                type: 'remove_note',
                data: {
                    city: city,
                    index: index
                }
            }));
        }
    }

    public getIsGM() : BehaviorSubject<boolean> {
        return this.isGameMaster;
    }

    public leaveRemoteGame() : void {
        this.gameSocket.close();
    }

    public getIsWebsocketOpen() : BehaviorSubject<boolean> {
        return this.isWebsocketOpen;
    }

    private updatePlayers(playerList: string[]) : void {
        this.playerList.next(playerList);
    }

    public getPlayers() : BehaviorSubject<string[]> {
        return this.playerList;
    }

}
