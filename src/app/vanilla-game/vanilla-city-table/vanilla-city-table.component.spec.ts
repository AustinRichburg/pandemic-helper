import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaCityTableComponent } from './vanilla-city-table.component';

describe('VanillaCityTableComponent', () => {
  let component: VanillaCityTableComponent;
  let fixture: ComponentFixture<VanillaCityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanillaCityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanillaCityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
