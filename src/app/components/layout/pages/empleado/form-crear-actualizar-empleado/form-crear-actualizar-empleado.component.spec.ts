import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearActualizarEmpleadoComponent } from './form-crear-actualizar-empleado.component';

describe('FormCrearActualizarEmpleadoComponent', () => {
  let component: FormCrearActualizarEmpleadoComponent;
  let fixture: ComponentFixture<FormCrearActualizarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCrearActualizarEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearActualizarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
