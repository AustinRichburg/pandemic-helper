import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-game-history',
    templateUrl: './game-history.component.html',
    styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

    @Input() gameHistory: string[];
    hideHistory: boolean = false;

    constructor() { }

    ngOnInit() { }

    // hideHistory() {

    // }

}
