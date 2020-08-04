import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaCityTableRemoteComponent } from './vanilla-city-table-remote.component';
import { InfectionRateComponent } from 'src/app/infection-rate/infection-rate.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { GameHistoryComponent } from 'src/app/shared/game-history/game-history.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckRemoteService } from 'src/app/deck-remote.service';
import { BehaviorSubject } from 'rxjs';

describe('VanillaCityTableRemoteComponent', () => {
  let component: VanillaCityTableRemoteComponent;
  let fixture: ComponentFixture<VanillaCityTableRemoteComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanillaCityTableRemoteComponent, InfectionRateComponent, GameHistoryComponent, SnackbarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, MatTableModule, MatDialogModule ],
      providers: [ AuthService,
        { provide: DeckRemoteService, useClass: MockDeckRemote },
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: v => { return { gameId: 'ABC123' } } } } } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
    localStorage.setItem("user", '"{token: \'123\'}"');
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { isGM: false} } });
    fixture = TestBed.createComponent(VanillaCityTableRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockDeckRemote extends DeckRemoteService {
  getPlayers() : BehaviorSubject<string[]>{
    return new BehaviorSubject<string[]>(['Austin', 'Bob']);
  }
}
