import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRolesUsuarioComponent } from './gestionar-roles-usuario.component';

describe('GestionarRolesUsuarioComponent', () => {
  let component: GestionarRolesUsuarioComponent;
  let fixture: ComponentFixture<GestionarRolesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GestionarRolesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarRolesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
