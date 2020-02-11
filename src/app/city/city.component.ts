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
  currentEpidemic: number;
  Cities: string[];

  constructor(private deckService: DeckService) {
    this.Cities = Cities;
  }

  ngOnInit() {
    this.deckService.getDeck().subscribe(deck => {this.deck = deck});
    this.deckService.getCurrentEpidemic().subscribe(index => this.currentEpidemic = index);
  }

  draw(city : string) : void {
    this.deckService.drawCard(city);
  }

  epidemic() : void {
    this.deckService.epidemic();
  }

}


