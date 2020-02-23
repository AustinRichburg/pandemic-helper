import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandemicLegacyComponent } from './pandemic-legacy.component';

describe('PandemicLegacyComponent', () => {
  let component: PandemicLegacyComponent;
  let fixture: ComponentFixture<PandemicLegacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandemicLegacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandemicLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
