import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasNotifComponent } from './alertas-notif.component';

describe('AlertasNotifComponent', () => {
  let component: AlertasNotifComponent;
  let fixture: ComponentFixture<AlertasNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
