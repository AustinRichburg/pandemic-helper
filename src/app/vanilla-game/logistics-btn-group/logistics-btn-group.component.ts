import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { WebsocketConfigService } from 'src/app/websocketConfig.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { JoinMultiComponent } from 'src/app/shared/join-multi/join-multi.component';
import { DeckService } from 'src/app/deck.service';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';

@Component({
    selector: 'app-logistics-btn-group',
    templateUrl: './logistics-btn-group.component.html',
    styleUrls: ['./logistics-btn-group.component.scss']
})
export class LogisticsBtnGroupComponent implements OnInit {

    @Input() dialog: MatDialog;

    constructor(
        private auth: AuthService,
        private deck: DeckService,
        private router: Router,
        private wsConfig: WebsocketConfigService) { }

    ngOnInit(): void { }

    joinRemoteGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        const success = (res: any) => {
            if (res) {
                this.router.navigate(['/vanilla/' + res.id]);
                this.wsConfig.setGameId(res.id);
            } else {
                // logic to handle error joining game
            }
        };

        const config = new MatDialogConfig();
        let joinMultiRef = this.dialog.open(JoinMultiComponent, config);
        joinMultiRef.afterClosed().subscribe(
            result => success(result)
        );
    }

    saveGame() {
        try {
            this.auth.throwErrorIfNotLoggedIn();
        } catch (err) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        this.deck.saveGame();
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
            this.dialog.open(GameListComponent, config);
        }

        this.auth.getGameList().subscribe(
            res => gameListSuccess(res)
        );
    }

    //TODO: move this to auth service
    // Logic to create unique game ID to identify saved games
    private dec2hex (dec: any) {
        return ('0' + dec.toString(16)).substr(-2)
    }

    private generateId (len: number) : string {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }

}
