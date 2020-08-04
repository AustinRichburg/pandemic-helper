import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            providers: [ AuthService, {provide: ComponentFixtureAutoDetect, useValue: true} ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { message: 'This is a test'} } });
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be a valid email', async () => {
        await fixture.whenStable();

        let input = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        const isValid = (email: string) => {
            return component.emailValidation.test(email.toLowerCase());
        };

        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.username)).toBeFalsy();

        input.value = 'NotAValidEmail';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.username)).toBeFalsy();

        input.value = 'valid@email.com';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.username)).toBeTruthy();
    });

});
