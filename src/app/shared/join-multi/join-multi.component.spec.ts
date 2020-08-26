import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMultiComponent } from './join-multi.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('JoinMultiComponent', () => {
    let component: JoinMultiComponent;
    let fixture: ComponentFixture<JoinMultiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ JoinMultiComponent ],
            imports: [ FormsModule, MatDialogModule, HttpClientTestingModule, RouterTestingModule ],
            providers: [ { provide: MatDialogRef, useValue: {} } ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinMultiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not accept empty ID', () => {
        let input = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();

        input.value = '    ';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();

        input.value = '       ';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();
    });

    it('should not accept IDs not 6 characters in length', () => {
        let input = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;

        input.value = 'ushdu8978sa';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();

        input.value = 'sdwe4';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();

        input.value = 'sdwe434';
        input.dispatchEvent(new Event('input'));
        expect(component.joinRemoteGame()).toBeFalsy();
    });

});
