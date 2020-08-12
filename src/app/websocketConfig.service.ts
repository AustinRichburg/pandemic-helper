import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketConfigService {

    gameId: BehaviorSubject<string>;

    public constructor() {
        const existingGameId = JSON.parse(localStorage.getItem('user')).gameId ?? '';
        this.gameId = new BehaviorSubject(existingGameId);
    }

    public setGameId(id: string) : void {
        this.gameId.next(id);
        let user = JSON.parse(localStorage.getItem('user'));
        user.gameId = id;
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getGameId() : BehaviorSubject<string> {
        return this.gameId;
    }

}