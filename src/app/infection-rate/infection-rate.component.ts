import { Component, OnInit } from '@angular/core';
import { Rate } from '../constants';
import { GameService } from '../game.service';

@Component({
    selector: 'app-infection-rate',
    templateUrl: './infection-rate.component.html',
    styleUrls: ['./infection-rate.component.scss']
})
export class InfectionRateComponent implements OnInit {

    rates: number[];
    isCurrent: boolean;

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.rates = Rate;
    }

}
