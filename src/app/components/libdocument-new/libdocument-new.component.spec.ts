import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibdocumentNewComponent } from './libdocument-new.component';

describe('LibdocumentNewComponent', () => {
  let component: LibdocumentNewComponent;
  let fixture: ComponentFixture<LibdocumentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibdocumentNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibdocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
