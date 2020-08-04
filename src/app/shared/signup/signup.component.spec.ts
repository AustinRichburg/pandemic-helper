import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/models/user';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let auth: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SignupComponent ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ],
            imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        auth = fixture.debugElement.injector.get(AuthService);
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

    it('should be a valid password', async () => {
        await fixture.whenStable();

        let input = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
        const isValid = (password: string) => {
            return password.length > 6 && password.length < 22 && password.search(component.whitespace) === -1;
        };

        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeFalsy();

        input.value = '     ';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeFalsy();

        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeFalsy();

        input.value = 'almost a valid pass';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeFalsy();

        input.value = 'thispasswordisalittletoolong';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeFalsy();

        input.value = 'testpassword';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeTruthy();

        input.value = 't3stp@ssw0rd!';
        input.dispatchEvent(new Event('input'));
        expect(isValid(component.user.password)).toBeTruthy();
    });

    it('should match passwords', async () => {
        await fixture.whenStable();

        let password = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
        let passwordMatch = fixture.debugElement.query(By.css('input[name="password-validate"]')).nativeElement;
        spyOn(component, 'doPasswordsMatch').and.callThrough();

        password.value = '';
        passwordMatch.value = 'password123';
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        expect(component.passwordsMatch).toBeFalsy();

        password.value = 'password123';
        passwordMatch.value = '';
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        expect(component.passwordsMatch).toBeFalsy();

        password.value = 'password123';
        passwordMatch.value = 'password345';
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        expect(component.passwordsMatch).toBeFalsy();

        password.value = 'password123';
        passwordMatch.value = 'password123';
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        expect(component.passwordsMatch).toBeTruthy();

        expect(component.doPasswordsMatch).toHaveBeenCalledTimes(4);
    });

    it('should submit successfully', async () => {
        await fixture.whenStable();

        let email = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
        let password = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
        let passwordMatch = fixture.debugElement.query(By.css('input[name="password-validate"]')).nativeElement;
        let form = fixture.debugElement.query(By.css('form')).nativeElement;
        spyOn(auth, 'signUp').and.callThrough();

        email.value = '';
        password.value = '';
        passwordMatch.value = '';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = 'test@test.com';
        password.value = '';
        passwordMatch.value = '';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = 'test@test.com';
        password.value = 'password123';
        passwordMatch.value = '';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = '';
        password.value = 'password123';
        passwordMatch.value = 'password123';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = 'test@test.com';
        password.value = 'password123';
        passwordMatch.value = 'password234';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = 'notavalidemail';
        password.value = 'password123';
        passwordMatch.value = 'password123';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(0);

        email.value = 'test@test.com';
        password.value = 'password123';
        passwordMatch.value = 'password123';
        email.dispatchEvent(new Event('input'));
        password.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('input'));
        passwordMatch.dispatchEvent(new Event('change'));
        form.dispatchEvent(new Event('submit'));
        expect(auth.signUp).toHaveBeenCalledTimes(1);

    });

});

class MockAuthService {

    signUp(user: User) {
        return true;
    }

}

