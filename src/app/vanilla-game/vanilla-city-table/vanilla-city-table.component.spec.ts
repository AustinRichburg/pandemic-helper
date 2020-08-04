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

describe('VanillaCityTableComponent', () => {
    let component: VanillaCityTableComponent;
    let fixture: ComponentFixture<VanillaCityTableComponent>;
    let deck: DeckService;

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
        deck = fixture.debugElement.injector.get(DeckService);
        fixture = TestBed.createComponent(VanillaCityTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should draw a card correctly', () => {
        let firstRow = fixture.debugElement.query(By.css(''))
    });

});

// class mockDeckService {
//     deck: Object = { 
//         'Washington': {

//         },
//         'Cairo': {

//         },
//         'Atlanta': {

//         },
//         'New York': {

//         },
//         'Jacksonville': {

//         }
//     }
// };
