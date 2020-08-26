import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/auth.service';
import { DeckService } from 'src/app/deck.service';
import { WebsocketConfigService } from 'src/app/websocketConfig.service';

import { JoinMultiComponent } from 'src/app/shared/join-multi/join-multi.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';

@Component({
    selector: 'app-logistics-btn-group',
    templateUrl: './logistics-btn-group.component.html',
    styleUrls: ['./logistics-btn-group.component.scss']
})
export class LogisticsBtnGroupComponent implements OnInit {

    @Input() dialog: MatDialog;
    @Input() isJoinedGame: boolean;

    constructor(
        private auth: AuthService,
        private deck: DeckService,
        private router: Router,
        private wsConfig: WebsocketConfigService,
        private snackbar: MatSnackBar) { }

    ngOnInit(): void { }

    joinRemoteGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        const success = (id: string) => {
            if (id) {
                this.router.navigate(['/vanilla/' + id]);
                this.wsConfig.setGameId(id);
                this.snackbar.open('Joined game.');
            }
        };

        const config = new MatDialogConfig();
        let joinMultiRef = this.dialog.open(JoinMultiComponent, config);
        joinMultiRef.afterClosed().subscribe(
            result => success(result)
        );
    }

    leaveRemoteGame() {
        this.wsConfig.leaveGame();
        this.snackbar.open('Left game.');
    }

    saveGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        this.deck.saveGame();
        this.snackbar.open('Saved game.');
    }

    loadGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }
        
        let gameList = [];
        let gameListSuccess = (res: any) => {
            gameList = res['data'];
            let config = new MatDialogConfig();
            config.data = gameList;
            let dialogRef = this.dialog.open(GameListComponent, config);
            dialogRef.afterClosed().subscribe(
                res => {
                    if (res) {
                        this.snackbar.open('Game loaded.');
                    }
                }
            );
        }

        this.auth.getGameList().subscribe(
            res => gameListSuccess(res)
        );
    }

    newGame() : void {
        let config = new MatDialogConfig();
        let dialogRef = this.dialog.open(GameOverModalComponent, config);
        dialogRef.afterClosed().subscribe(
            res => {
                if (res) {
                    this.deck.newGame();
                    this.snackbar.open('New game started.');
                }
            }
        );

    }

}
