import { Component, OnInit } from '@angular/core';
import { Rate } from '../constants';
import { DeckService } from '../deck.service';

/**
 * Component that simply displays the number of cards to draw based on the current epidemic index.
 */
@Component({
    selector: 'app-infection-rate',
    templateUrl: './infection-rate.component.html',
    styleUrls: ['./infection-rate.component.scss']
})
export class InfectionRateComponent implements OnInit {

    /* Array of number of cards to draw */
    rates: number[];

    constructor(private deck: DeckService) { }

    ngOnInit() {
        this.rates = Rate;
    }

}
