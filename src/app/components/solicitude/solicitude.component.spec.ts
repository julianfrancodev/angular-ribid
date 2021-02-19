import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudeComponent } from './solicitude.component';

describe('SolicitudeComponent', () => {
  let component: SolicitudeComponent;
  let fixture: ComponentFixture<SolicitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
