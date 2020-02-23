import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { Cities } from '../constants';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  deck: Object[];
  Cities: string[];

  constructor(private deckService: DeckService) {
    this.Cities = Cities;
  }

  ngOnInit() {
    this.Cities = this.Cities.sort();
  }

  draw(city : string) : void {
    this.deckService.drawCard(city);
  }

  epidemic() : void {
    this.deckService.epidemic();
  }

}


