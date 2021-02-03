import { TestBed } from '@angular/core/testing';

import { RespostService } from './respost.service';

describe('RespostService', () => {
  let service: RespostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
