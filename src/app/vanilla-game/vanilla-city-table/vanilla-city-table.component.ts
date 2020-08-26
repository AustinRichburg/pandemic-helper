import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DeckService } from '../../deck.service';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { NotesComponent } from 'src/app/shared/notes/notes.component';


@Component({
    selector: 'app-vanilla-city-table',
    templateUrl: './vanilla-city-table.component.html',
    styleUrls: ['./vanilla-city-table.component.scss']
})
export class VanillaCityTableComponent implements OnInit {

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    deck: MatTableDataSource<Object>;
    columns = ['name', 'chance', 'totalOfCard', 'numInPiles', 'actions', 'notes'];
    isGameOver: boolean;
    
    gameHistory: string[];
    epidemic_index: number;
    

    constructor(private deckService: DeckService,
                public dialog: MatDialog) {}

    ngOnInit() {
        this.isGameOver = false;
        this.deckService.isGameChange().subscribe(
            (gameChange) => {
                if (gameChange) {
                    this.deckService.getDeck().subscribe(
                        (deck) => {
                            this.deck = new MatTableDataSource(deck);
                            this.deck.sort = this.sort;
                            this.deck.sortingDataAccessor = this.sortFunc;
                        }
                    );
                    this.deckService.getGameHistory().subscribe(
                        history => this.gameHistory = history
                    );
                    this.deckService.getEpidemic().subscribe(
                        index => this.epidemic_index = index
                    );
                    this.deckService.getGameOver().subscribe(
                        isGameOver => {
                            if (isGameOver) {
                                const config = new MatDialogConfig();
                                this.dialog.open(GameOverModalComponent, config);
                            }
                        }
                    );
                }
            }  
        );
    }

    

    draw(name: string) {
        this.deckService.drawCard(name);
    }

    epidemic() : void {
        this.deckService.epidemic();
    }

    sortFunc(item, header) {
        switch (header) {
            case 'name': return item.name;
            case 'chance': return item.chance;
            case 'totalOfCard': return item.in_deck;
            case 'numInPiles': return item.curr_drawn;
        }
    }

    openNotes(city: any) {
        const config = new MatDialogConfig();
        config.data = {
            name: city.name,
            notes: this.deckService.getNotes(city.name),
            deckService: this.deckService
        };
        this.dialog.open(NotesComponent, config);
    }

}