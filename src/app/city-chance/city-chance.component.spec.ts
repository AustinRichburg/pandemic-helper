import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityChanceComponent } from './city-chance.component';

describe('CityChanceComponent', () => {
  let component: CityChanceComponent;
  let fixture: ComponentFixture<CityChanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityChanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityChanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
