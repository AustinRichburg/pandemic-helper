import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit {

    testData: Object[] = [
        {
            name: 'Washington',
            drawn: 2,
            inDeck: 1,
            chance: 14.37
        },
        {
            name: 'Los Angeles',
            drawn: 1,
            inDeck: 2,
            chance: 19.37
        },
        {
            name: 'Cairo',
            drawn: 0,
            inDeck: 3,
            chance: 55.00
        }
    ];

    displayColumns: string[];

    constructor() {
        this.displayColumns = Object.keys(this.testData[0]);
    }

    ngOnInit() { }

}
