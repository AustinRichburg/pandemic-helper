import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import { By } from '@angular/platform-browser';

describe('SnackbarComponent', () => {
    let component: SnackbarComponent;
    let fixture: ComponentFixture<SnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SnackbarComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display message', () => {
        let snackbar = fixture.debugElement.query(By.css('.snackbar')).nativeElement;
        const isShow = (ele: string) => ele === 'show';

        expect(snackbar.classList.contains('show')).toBeFalsy();

        component.displayMessage('This is a test snackbar.');
        fixture.detectChanges();

        expect(component.display).toBeTruthy();
        expect(component.msg).toEqual('This is a test snackbar.');
        expect(snackbar.classList.contains('show')).toBeTruthy();
    });

});
