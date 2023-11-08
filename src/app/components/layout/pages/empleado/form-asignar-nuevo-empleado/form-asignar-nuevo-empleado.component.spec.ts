import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsignarNuevoEmpleadoComponent } from './form-asignar-nuevo-empleado.component';

describe('FormAsignarNuevoEmpleadoComponent', () => {
  let component: FormAsignarNuevoEmpleadoComponent;
  let fixture: ComponentFixture<FormAsignarNuevoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormAsignarNuevoEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsignarNuevoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
