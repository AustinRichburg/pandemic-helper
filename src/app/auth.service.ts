import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /* API url, obviously will remove this when deployed. */
    private apiUrl: string = 'http://127.0.0.1:8000/';

    /* Source of truth for whether user is signed in */
    private signedIn: BehaviorSubject<boolean>;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
            this.signedIn = new BehaviorSubject(typeof localStorage.getItem("user") === 'string');
    }

    /**
     * Returns if user is signed in.
     */
    public getSignedIn() : BehaviorSubject<boolean> {
        return this.signedIn;
    }

    /**
     * Checks the credentials given against the back-end. Performs 
     * @param user The credentials of the user to login
     */
    public login(user: User) : void {
        // If the user is already logged in, return true.
        if (this.signedIn.getValue()) {
            return;
        }

        // Functions for HTTP resolutions
        const loginSuccess = (res: Object) => {
            this.setToken(user.username, res['token']);
            this.signedIn.next(true);
            this.router.navigate(['/vanilla']);
        };
        const loginError = function(err: any) {
            return;
        };
        const loginComplete = function() {
            console.log('this is the complete function');
        };

        this.http.post(this.apiUrl + 'auth/login/', user).subscribe(
            res => loginSuccess(res),
            err => loginError(err),
            () => loginComplete()
        );
    }

    /**
     * Registers a new user if they don't already exist.
     * @param user The user to signup. Two properties: username and password.
     */
    public signUp(user: User) : void {
        // If the user is logged in, return true.
        if (this.signedIn.getValue()) {
            return;
        }

        // Functions for HTTP resolutions
        const signupSuccess = (res: Object) => {
            this.router.navigate(['/login']);
        };
        const signupError = function(err: any) {
            return;
        };
        const signupComplete = function() {
            console.log('this is the complete function');
        };

        this.http.post(this.apiUrl + 'auth/signup/', user).subscribe(
            res => signupSuccess(res),
            err => signupError(err),
            () => signupComplete()
        );
    }

    /**
     * Logs the user out and removes their cookie.
     */
    public logout() : void {
        this.signedIn.next(false);
        localStorage.removeItem("user");
    }

    /**
     * Allows the user to join a remote game that is in progress.
     * @param gameId ID of the remote game.
     */
    public joinRemoteGame(gameId: string) : Observable<Object> {
        // This is a feature that requires an account.
        if (!this.signedIn.getValue()) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        // validate the game ID here

        return this.http.get(this.apiUrl + 'game/remote/' + gameId + '/');
    }

    /**
     * Requests a list of all saved games assigned to the user.
     */
    public getGameList() : Observable<Object> {
        // This is a feature that requires an account.
        if (!this.signedIn.getValue()) {
            this.router.navigate(['/login'], {state: {message: 'You need to be logged in to do that.'}});
            return;
        }

        return this.http.get(this.apiUrl + 'game');
    }

    /**
     * Sets the user's token to client memory.
     * @param username Username.
     * @param token The user's auth token.
     */
    private setToken(username: string, token: string) : void {
        localStorage.setItem("user", JSON.stringify({username: username, token: token}));
    }

    public setGameId(gameId: string) : void {
        localStorage.setItem("game_id", gameId);
    }

    public throwErrorIfNotLoggedIn() {
        if (!this.signedIn.getValue()) {
            throw new UnauthorizedError('');
        }
    }

    public getGameId() : Observable<Object> {
        return this.http.post(this.apiUrl + 'game/remote/', {});
    }

}

class UnauthorizedError extends Error {

    err: string = 'Something went wrong.';

    constructor(err: string) {
        super();
        this.err = err;
    }

    getError() : string {
        return this.err;
    }

}
