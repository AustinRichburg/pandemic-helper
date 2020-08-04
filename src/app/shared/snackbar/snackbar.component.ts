import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

    display: boolean = false;
    msg: string = '';

    constructor() { }

    ngOnInit() { }

    displayMessage(msg: string) {
        this.display = true;
        this.msg = msg;
        setTimeout(
            () => this.display = false, 2750
        );
    }

}
