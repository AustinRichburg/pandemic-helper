import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketConfigService {

    gameId: BehaviorSubject<string>;

    public constructor() {
        const existingGameId = localStorage.getItem('game_id') ?? '';
        this.gameId = new BehaviorSubject(existingGameId);
    }

    public setGameId(id: string) : void {
        this.gameId.next(id);
    }

    public getGameId() : BehaviorSubject<string> {
        return this.gameId;
    }

    public isJoinedGame() : boolean {
        return this.gameId.value !== localStorage.getItem('game_id');
    }

    public leaveGame() : void {
        this.gameId.next(localStorage.getItem('game_id'));
    }

}