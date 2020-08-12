import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { WebsocketConfigService } from '../websocketConfig.service';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-vanilla-game',
    templateUrl: './vanilla-game.component.html',
    styleUrls: ['./vanilla-game.component.scss']
})
export class VanillaGameComponent implements OnInit {

    hasConnected: boolean;
    gameId: string;

    constructor(
        private auth: AuthService,
        private deck: DeckService,
        private wsConfig: WebsocketConfigService) { }

    ngOnInit() {
        this.wsConfig.getGameId().subscribe(
            (gameId) => {
                if (gameId === '') {
                    this.auth.getGameId().subscribe(
                        res => {
                            this.gameId = res['id'];
                            this.wsConfig.setGameId(res['id']);

                        }
                    );
                }
                this.gameId = gameId;
            }
        );
        
    }

    getHasConnected(): Observable<boolean> {
        return of(this.hasConnected);
    }

}