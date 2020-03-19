import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit {

    deck: Object;
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions'];

    constructor(private deckService: DeckService) {}

    ngOnInit() {
        this.deckService.getDeck().subscribe(deck => this.deck = deck)
    }

    draw(name: string) {
        this.deckService.drawCard(name);
    }

    epidemic() : void {
        this.deckService.epidemic();
    }

}
