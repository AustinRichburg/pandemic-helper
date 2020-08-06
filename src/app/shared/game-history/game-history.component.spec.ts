import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHistoryComponent } from './game-history.component';
import { By } from '@angular/platform-browser';

describe('GameHistoryComponent', () => {
    let component: GameHistoryComponent;
    let fixture: ComponentFixture<GameHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ GameHistoryComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display game history', () => {
        component.gameHistory = mockGameHistory;
        fixture.detectChanges();
        let historyLength = fixture.debugElement.queryAll(By.css('.game-history-node')).length;
        expect(historyLength).toEqual(component.gameHistory.length); 
    });

    it('should hide on button click', () => {
        const hideButton = fixture.debugElement.query(By.css('.hide-history')).nativeElement;
        const history = fixture.debugElement.query(By.css('.game-history-content')).nativeElement;

        hideButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(history.classList.contains('hidden')).toBeTruthy();
    });
    
});

let mockGameHistory: string[] = [
    "Washington was drawn.",
    "New York was drawn.",
    "New York was drawn.",
    "New York was drawn.",
    "Epidemic 2 occured.",
    "Jacksonville was drawn.",
    "Paris was drawn.",
    "Jacksonville was drawn.",
    "Cairo was drawn.",
    "Washington was drawn.",
    "New York was drawn.",
    "New York was drawn.",
    "New York was drawn.",
    "Epidemic 2 occured.",
    "Jacksonville was drawn.",
    "Paris was drawn.",
    "Jacksonville was drawn.",
    "Cairo was drawn."
];
