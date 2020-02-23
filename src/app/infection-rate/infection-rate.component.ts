import { Component, OnInit } from '@angular/core';
import { Rate } from '../constants';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-infection-rate',
    templateUrl: './infection-rate.component.html',
    styleUrls: ['./infection-rate.component.scss']
})
export class InfectionRateComponent implements OnInit {

    rate: number[];
    currentEpidemic: number = 0;

    constructor(private deckService: DeckService) {
        this.rate = Rate;
        this.deckService.getCurrentEpidemic().subscribe(
            (index) => {
                console.log('success', index);
                if (!index)
                    this.currentEpidemic = 0;
                else
                    this.currentEpidemic = index;
            },
            (error) => console.log(error),
            () => console.log('success')
        );
    }

    ngOnInit() { }

}
