import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    apiUrl: string = 'http://127.0.0.1:8000/';
    user: User = new User('', '');

    /* Regex validating email format */
    emailValidation: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private http: HttpClient, private auth: AuthService) { }

    ngOnInit() { }

    login() {
        // Validate the email is properly formatted and valid email
        const email = this.user.username.toLowerCase();

        if (!this.emailValidation.test(String(email))) {
            console.log('not email');
            return;
        }

        this.auth.login(this.user);
    }

}
