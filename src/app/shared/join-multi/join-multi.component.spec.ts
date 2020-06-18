import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMultiComponent } from './join-multi.component';

describe('JoinMultiComponent', () => {
  let component: JoinMultiComponent;
  let fixture: ComponentFixture<JoinMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinMultiComponent ]
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
});
