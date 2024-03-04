import { TestBed } from '@angular/core/testing';

import { BoitService } from './boit.service';

describe('BoitService', () => {
  let service: BoitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
