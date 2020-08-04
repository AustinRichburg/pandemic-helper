import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesComponent } from './rules.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RulesComponent', () => {
    let component: RulesComponent;
    let fixture: ComponentFixture<RulesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RulesComponent],
            imports: [FormsModule],
            providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: v => { return { type: 'vanilla' } } } } } }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RulesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should search on keystrokes', () => {
        let search = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
        spyOn(component, 'onSearch');
        search.dispatchEvent(new Event('keyup'));

        expect(component.onSearch).toHaveBeenCalled();
    });

    it('should show subtext on dropdown click', () => {
        let textSections = fixture.debugElement.queryAll(By.css('.text-section'));
        spyOn(component, 'toggleSubtext');
        textSections.forEach(section => {
            section.nativeElement.dispatchEvent('click');
        })

        expect(component.toggleSubtext).toHaveBeenCalledTimes(textSections.length);
    });
});

