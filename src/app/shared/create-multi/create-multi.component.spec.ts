import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { CreateMultiComponent } from './create-multi.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CreateMultiComponent', () => {
    let component: CreateMultiComponent;
    let fixture: ComponentFixture<CreateMultiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CreateMultiComponent ],
            imports: [ FormsModule, MatDialogModule, HttpClientTestingModule, RouterTestingModule ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: MatDialogRef, useValue: {} },
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateMultiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should ignore empty name', () => {
        let input = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(component.createRemoteGame()).toBeFalsy();

        input.value = '    ';
        input.dispatchEvent(new Event('input'));
        expect(component.createRemoteGame()).toBeFalsy();

        input.value = '       ';
        input.dispatchEvent(new Event('input'));
        expect(component.createRemoteGame()).toBeFalsy();
    });

    it('should model input in component', () => {
        let input = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;

        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        expect(fixture.componentInstance.name).toBe('test');
    });

});

class MockAuthService {

    joinRemoteGame(id: string) {
        return true;
    }

}
