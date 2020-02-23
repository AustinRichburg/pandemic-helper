import { Component, OnInit } from '@angular/core';
import { Cities } from '../constants';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-city-chance',
    templateUrl: './city-chance.component.html',
    styleUrls: ['./city-chance.component.scss']
})
export class CityChanceComponent implements OnInit {

    private Cities: Object[];
    private displayedColumns: string[];

    constructor(private deckService: DeckService) {
        this.Cities = Cities.map(city => {return {name: city, chance: this.deckService.getChanceToDraw(city)}});
        this.displayedColumns = ['name', 'chance'];
    }

    ngOnInit() { }

    sortByChance() : void {
        
    }

}
