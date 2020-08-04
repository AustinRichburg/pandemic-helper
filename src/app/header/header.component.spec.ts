import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../auth.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture < HeaderComponent > ;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
                declarations: [HeaderComponent],
                providers: [AuthService],
                imports: [HttpClientTestingModule, RouterTestingModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
