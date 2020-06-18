import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiComponent } from './create-multi.component';

describe('CreateMultiComponent', () => {
  let component: CreateMultiComponent;
  let fixture: ComponentFixture<CreateMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
