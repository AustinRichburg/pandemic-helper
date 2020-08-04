import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /* Regex validating email format */
    readonly emailValidation: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    readonly apiUrl: string = 'http://127.0.0.1:8000/';

    user: User = new User('', '');

    state: Object;

    constructor(private auth: AuthService, private router: Router) {
        this.state = this.router.getCurrentNavigation().extras.state;
    }

    ngOnInit() { }

    login() {
        // Validate the email is properly formatted and valid
        const email = this.user.username.toLowerCase();

        if (!this.emailValidation.test(String(email))) {
            console.log('not email');
            return;
        }

        this.auth.login(this.user);
    }

}
