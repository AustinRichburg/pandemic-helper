import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandemicVanillaComponent } from './pandemic-vanilla.component';

describe('PandemicVanillaComponent', () => {
  let component: PandemicVanillaComponent;
  let fixture: ComponentFixture<PandemicVanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandemicVanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandemicVanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
