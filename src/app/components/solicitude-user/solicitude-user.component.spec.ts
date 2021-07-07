import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudeUserComponent } from './solicitude-user.component';

describe('SolicitudeUserComponent', () => {
  let component: SolicitudeUserComponent;
  let fixture: ComponentFixture<SolicitudeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
