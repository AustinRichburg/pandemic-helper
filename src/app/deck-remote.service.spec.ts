import { TestBed } from '@angular/core/testing';

import { DeckRemoteService } from './deck-remote.service';

describe('DeckRemoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckRemoteService = TestBed.get(DeckRemoteService);
    expect(service).toBeTruthy();
  });
});
