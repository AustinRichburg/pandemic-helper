import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = 'http://127.0.0.1:8000/';
    private signedIn: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) {
        this.signedIn = new BehaviorSubject(typeof localStorage.getItem("user") === 'string');
    }

    public isSignedIn() : BehaviorSubject<boolean> {
        return this.signedIn;
    }

    public login(user: User) : void {
        this.http.post(this.apiUrl + 'auth/login/', user).subscribe(
            res => { this.setToken(user.username, res['token']); this.signedIn.next(true); }
        );
    }

    public signUp(user: User) : void {
        this.http.post(this.apiUrl + 'auth/signup', user).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log('complete')
        );
    }

    public logout() : void {
        this.signedIn.next(false);
        localStorage.removeItem("user");
    }

    private setToken(username: string, token: string) : void {
        localStorage.setItem("user", JSON.stringify({username: username, token: token}));
    }

}
