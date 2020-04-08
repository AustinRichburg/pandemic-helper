import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTwoComponent } from './season-two.component';

describe('SeasonTwoComponent', () => {
  let component: SeasonTwoComponent;
  let fixture: ComponentFixture<SeasonTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
