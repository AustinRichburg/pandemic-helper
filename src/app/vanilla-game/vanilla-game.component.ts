import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { WebsocketConfigService } from '../websocketConfig.service';
import { DeckService } from '../deck.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-vanilla-game',
    templateUrl: './vanilla-game.component.html',
    styleUrls: ['./vanilla-game.component.scss']
})
export class VanillaGameComponent implements OnInit, AfterViewInit {

    @ViewChild(SnackbarComponent, {static: true}) snackbar: SnackbarComponent;

    hasConnected: boolean;
    gameId: string;
    msg = "test";
    title: string = "Pandemic Helper - Vanilla";

    constructor(
        private titleService: Title,
        private auth: AuthService,
        private deck: DeckService,
        private wsConfig: WebsocketConfigService,
        public dialog: MatDialog) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);
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

    ngAfterViewInit() {
        this.displaySnackbar = (msg: string) => { this.snackbar.displayMessage(msg) }
    }

    getHasConnected(): Observable<boolean> {
        return of(this.hasConnected);
    }

    displaySnackbar(msg: string) {
        return;
    }

}