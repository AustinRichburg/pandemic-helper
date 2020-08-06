import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaCityTableComponent } from './vanilla-city-table.component';
import { InfectionRateComponent } from 'src/app/infection-rate/infection-rate.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { GameHistoryComponent } from 'src/app/shared/game-history/game-history.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth.service';
import { DeckService } from 'src/app/deck.service';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness, MatRowHarness } from '@angular/material/table/testing';
import { City } from 'src/app/City';

describe('VanillaCityTableComponent', () => {
    let component: VanillaCityTableComponent;
    let fixture: ComponentFixture<VanillaCityTableComponent>;
    let deck: DeckService;
    let loader: HarnessLoader;
    let gameDeck: Object;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VanillaCityTableComponent, InfectionRateComponent, GameHistoryComponent, SnackbarComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, MatTableModule, MatDialogModule ],
            providers: [
                AuthService,
                DeckService,
                // { provide: DeckService, useClass: mockDeckService },
                { provide: MatDialogRef, useValue: {} }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VanillaCityTableComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        deck = fixture.debugElement.injector.get(DeckService);
        deck.getDeck().subscribe(deck => gameDeck = deck)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should draw a card correctly', async () => {
        const rowLoader = await loader.getChildLoader('tbody');
        const row = await rowLoader.getHarness<MatRowHarness>(MatRowHarness);
        let city = await row.getCellTextByIndex();
        const drawButton = await rowLoader.getHarness<MatButtonHarness>(MatButtonHarness);

        let cityName = city['City'];
        let cityFromDeck: City = gameDeck[cityName];
        console.log(gameDeck);
        let testObj = {
            'Name': cityFromDeck.name,
            'Chance to Draw': cityFromDeck.chance(),
            'In Deck': cityFromDeck.inDeck(),
            'Drawn': cityFromDeck.currDrawn,
            'Notes': []
        };

        let rowObj = await row.getCellTextByIndex();
        console.log(rowObj);

        // expect(rowObj).toEqual(testObj);
        
        await drawButton.click();
    });

    it('should perform epidemic correctly', async () => {
        const epidemic = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
            text: 'Epidemic'
        }));
    });

});

