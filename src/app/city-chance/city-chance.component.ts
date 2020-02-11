import { Component, OnInit } from '@angular/core';
import { Cities } from '../constants';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-city-chance',
  templateUrl: './city-chance.component.html',
  styleUrls: ['./city-chance.component.scss']
})
export class CityChanceComponent implements OnInit {

  private Cities: string[];

  constructor(private deckService: DeckService) {
    this.Cities = Cities;
  }

  ngOnInit() {
  }

}
