import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';

//TODO: stop user scrolling when the menu is open

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    /* Boolean tracking whether the user is signed in, used to display proper auth links */
    signedIn: boolean;

    menu: HTMLElement;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.menu = document.querySelector('.header-content');
        this.auth.getSignedIn().subscribe(
            signedIn => this.signedIn = signedIn
        );
        this.router.events.subscribe( e => {
            if (e instanceof NavigationStart) {
                this.menu.style.width = '0';
                this.menu.classList.remove('show');
            }
        });
    }

    /**
     * Logs the current user out.
     */
    logout() : void {
        if (!this.signedIn) return;
        this.auth.logout();
    }

    toggleMenu() {
        if (this.menu.classList.contains('show')) {
            this.menu.style.width = '0';
        } else {
            this.menu.style.width = '35%';
        }

        this.menu.classList.toggle('show');
    }

}
