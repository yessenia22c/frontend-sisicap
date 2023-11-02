import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearActualizarUsuarioComponent } from './form-crear-actualizar-usuario.component';

describe('FormCrearActualizarUsuarioComponent', () => {
  let component: FormCrearActualizarUsuarioComponent;
  let fixture: ComponentFixture<FormCrearActualizarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCrearActualizarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearActualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
