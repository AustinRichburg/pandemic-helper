import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    signedIn: boolean;

    constructor(private http: HttpClient, private auth: AuthService) { }

    ngOnInit() {
        this.auth.getSignedIn().subscribe(
            signedIn => this.signedIn = signedIn
        );
    }

    logout() {
        this.auth.logout();
    }

}
