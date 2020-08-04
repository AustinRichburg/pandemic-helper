import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    /* Boolean tracking whether the user is signed in, used to display proper auth links */
    signedIn: boolean;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.getSignedIn().subscribe(
            signedIn => this.signedIn = signedIn
        );
    }

    /**
     * Logs the current user out.
     */
    logout() : void {
        if (!this.signedIn) return;
        this.auth.logout();
    }

}
