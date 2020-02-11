import { TestBed } from '@angular/core/testing';

import { DeckServiceService } from './deck.service';

describe('DeckServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckServiceService = TestBed.get(DeckServiceService);
    expect(service).toBeTruthy();
  });
});
