import { TestBed } from '@angular/core/testing';

import { LibDocumentService } from './lib-document.service';

describe('LibDocumentService', () => {
  let service: LibDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
