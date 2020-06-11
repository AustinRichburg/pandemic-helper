import { Component, OnInit } from '@angular/core';
import { Rate } from '../constants';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-infection-rate',
    templateUrl: './infection-rate.component.html',
    styleUrls: ['./infection-rate.component.scss']
})
export class InfectionRateComponent implements OnInit {

    rates: number[];
    isCurrent: boolean;

    constructor(private deck: DeckService) { }

    ngOnInit() {
        this.rates = Rate;
    }

}
