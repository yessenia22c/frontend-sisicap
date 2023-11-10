import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearActualizarTipoUsuarioComponent } from './form-crear-actualizar-tipo-usuario.component';

describe('FormCrearActualizarTipoUsuarioComponent', () => {
  let component: FormCrearActualizarTipoUsuarioComponent;
  let fixture: ComponentFixture<FormCrearActualizarTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCrearActualizarTipoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearActualizarTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
