import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoAdminUsuarioComponent } from './grupo-admin-usuario.component';

describe('GrupoAdminUsuarioComponent', () => {
  let component: GrupoAdminUsuarioComponent;
  let fixture: ComponentFixture<GrupoAdminUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoAdminUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoAdminUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
