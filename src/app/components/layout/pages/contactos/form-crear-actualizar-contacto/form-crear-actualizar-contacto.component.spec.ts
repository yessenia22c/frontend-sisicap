import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearActualizarContactoComponent } from './form-crear-actualizar-contacto.component';

describe('FormCrearActualizarContactoComponent', () => {
  let component: FormCrearActualizarContactoComponent;
  let fixture: ComponentFixture<FormCrearActualizarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCrearActualizarContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearActualizarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
