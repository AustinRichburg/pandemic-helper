import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';

describe('GameListComponent', () => {
    let component: GameListComponent;
    let fixture: ComponentFixture<GameListComponent>;
    let data = {
        name: 'Washington',
        date: '2020-08-03 15:27:29.809543'
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GameListComponent ],
            imports: [ MatDialogModule ],
            providers: [DeckService, { provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: data}]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should format date correctly', () => {
        let date = "01/13/1995 16:34:29";
        expect(component.format(date)).toBe("January 13, 1995 04:34 PM");

        date = "1995-01-13T16:34:29";
        expect(component.format(date)).toBe("January 13, 1995 04:34 PM");
    });

});
