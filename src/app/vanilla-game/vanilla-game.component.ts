import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { WebsocketConfigService } from '../websocketConfig.service';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-vanilla-game',
    templateUrl: './vanilla-game.component.html',
    styleUrls: ['./vanilla-game.component.scss']
})
export class VanillaGameComponent implements OnInit {

    title: string = "Pandemic Helper - Vanilla";

    gameId: string;
    gameName: string = '';
    isJoinedGame: boolean = false;
    playerList: Object = {};

    constructor(
        private titleService: Title,
        private auth: AuthService,
        private deck: DeckService,
        private wsConfig: WebsocketConfigService,
        public dialog: MatDialog,
        private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.wsConfig.getGameId().subscribe(
            (gameId) => {
                if (gameId === '') {
                    this.auth.getGameId().subscribe(
                        res => {
                            this.gameId = res['id'];
                            this.wsConfig.setGameId(res['id']);
                            this.auth.setGameId(res['id']);
                        }
                    );
                }
                this.gameId = gameId;
                this.isJoinedGame = this.wsConfig.isJoinedGame();
            }
        );
        this.deck.isGameChange().subscribe(
            change => {
                if (change) {
                    this.deck.getGameName().subscribe(
                        name => this.gameName = name
                    );
                    this.deck.getPlayers().subscribe(
                        playerList => this.updatePlayerList(playerList)
                    );
                }
            }
        );
    }

    setGameName() : void {
        this.deck.setGameName(this.gameName);
    }

    updatePlayerList(list: Object) {
        const prevList = Object.keys(this.playerList);
        const newList = Object.keys(list);
        let diff = 'Player';

        if (prevList.length < newList.length) {
            diff = newList.find(ele => !prevList.includes(ele));
            this.snackbar.open(diff + ' has joined the game.');
        } else if (prevList.length > newList.length) {
            diff = prevList.find(ele => !newList.includes(ele));
            this.snackbar.open(diff + ' has left the game.');
        }

        this.playerList = list
    }

}