import { TestBed } from '@angular/core/testing';

import { TapService } from './tap.service';

describe('TapService', () => {
  let service: TapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
