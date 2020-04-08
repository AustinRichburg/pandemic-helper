import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonOneComponent } from './season-one.component';

describe('SeasonOneComponent', () => {
  let component: SeasonOneComponent;
  let fixture: ComponentFixture<SeasonOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
