import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['../login/login.component.scss']
})
export class SignupComponent implements OnInit {

    apiUrl: string = 'http://127.0.0.1:5000/';
    user: User = new User('', '');
    passwordValidate: string = '';
    passwordsMatch: boolean = true;

    constructor(private http: HttpClient) { }

    ngOnInit() { }

    signUp() {
        if (!this.passwordsMatch) {
            console.log('Passwords don\'t match');
            return;
        }
        this.http.post(this.apiUrl + 'users/create', this.user).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log('complete')
        );
    }

    doPasswordsMatch() {
        this.passwordsMatch = this.user.password === this.passwordValidate;
    }

}
