import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaDatosComponent } from './toma-datos.component';

describe('TomaDatosComponent', () => {
  let component: TomaDatosComponent;
  let fixture: ComponentFixture<TomaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
