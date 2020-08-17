import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsBtnGroupComponent } from './logistics-btn-group.component';

describe('LogisiticsBtnGroupComponent', () => {
  let component: LogisticsBtnGroupComponent;
  let fixture: ComponentFixture<LogisticsBtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsBtnGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
