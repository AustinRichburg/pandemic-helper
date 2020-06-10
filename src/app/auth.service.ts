import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = 'http://127.0.0.1:8000/';
    private signedIn: BehaviorSubject<boolean>;

    constructor(private http: HttpClient, private router: Router) {
        this.signedIn = new BehaviorSubject(typeof localStorage.getItem("user") === 'string');
    }

    public isSignedIn() : BehaviorSubject<boolean> {
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

    public logout() : void {
        this.signedIn.next(false);
        localStorage.removeItem("user");
    }

    public startRemoteGame() : void {
        // This is a feature that requires an account.
        if (!this.signedIn.getValue()) {
            this.router.navigate(['/login']);
            return;
        }

        // TODO: add remote game logic here
    }

    public saveGame(game: Object) : void {
        // This is a feature that requires an account.
        // if (!this.signedIn.getValue()) {
        //     this.router.navigate(['/login']);
        //     return;
        // }

        this.http.post(this.apiUrl + 'game/', game).subscribe(
            res => console.log(res)
        );
    }

    public getGameList() : void {
        this.http.get(this.apiUrl + 'game').subscribe(
            res => console.log(res)
        );
    }

    private setToken(username: string, token: string) : void {
        localStorage.setItem("user", JSON.stringify({username: username, token: token}));
    }

}