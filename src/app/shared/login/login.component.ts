import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    apiUrl: string = 'http://127.0.0.1:5000/';
    user: User = new User('', '');

    constructor(private http: HttpClient) { }

    ngOnInit() { }

    login() {
        let id = 123;
        this.http.post(this.apiUrl + 'users/' + id, this.user).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log('complete')
        );
    }

}
