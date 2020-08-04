import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverModalComponent } from './game-over-modal.component';
import { MatDialogRef, MatDialogModule } from '@angular/material';
import { DeckService } from 'src/app/deck.service';
import { By } from '@angular/platform-browser';

describe('GameOverModalComponent', () => {
    let component: GameOverModalComponent;
    let fixture: ComponentFixture<GameOverModalComponent>;
    let deck: DeckService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GameOverModalComponent ],
            imports: [ MatDialogModule ],
            providers: [DeckService, { provide: MatDialogRef, useValue: {} }]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameOverModalComponent);
        component = fixture.componentInstance;
        deck = fixture.debugElement.injector.get(DeckService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start a new game', () => {
        let button = fixture.debugElement.query(By.css('button[name="newGame"]')).nativeElement;
        spyOn(deck, 'newGame');

        button.dispatchEvent(new Event('click'));
        expect(deck.newGame).toHaveBeenCalled();
    });

});
