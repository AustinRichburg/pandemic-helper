import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['../login/login.component.scss']
})
export class SignupComponent implements OnInit {

    /* TODO: Turn this into ENV variable - API URL */
    apiUrl: string = 'http://127.0.0.1:8000/';

    /* User object used to track form data */
    user: User = new User('', '');

    /* Re-entered password used to ensure password was entered as intended */
    passwordValidate: string = '';
    passwordsMatch: boolean = false;

    /* Regex validating email format */
    emailValidation: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /* Regex check for whitespace */
    whitespace: RegExp = /[\s\n\r\t\0]/g

    constructor(private auth: AuthService) { }

    ngOnInit() { }

    signUp() {
        // Validate the email is properly formatted and valid email
        const email = this.user.username.toLowerCase();

        if (!this.emailValidation.test(String(email))) {
            return;
        }

        // Validate the password is the valid length
        const password = this.user.password.trim();

        if (password.length < 6 || password.length > 22) {
            return;
        }

        // Password should not contain whitespace
        if (password.search(this.whitespace) > -1) {
            return;
        }

        // Passwords should match
        if (!this.passwordsMatch) {
            return;
        }

        // Submit the form
        this.auth.signUp(new User(email, password));
    }

    doPasswordsMatch() {
        this.passwordsMatch = this.user.password === this.passwordValidate;
    }

}
