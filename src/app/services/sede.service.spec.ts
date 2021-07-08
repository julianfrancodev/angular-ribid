import { TestBed } from '@angular/core/testing';

import { SedeService } from './sede.service';

describe('SedeService', () => {
  let service: SedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
