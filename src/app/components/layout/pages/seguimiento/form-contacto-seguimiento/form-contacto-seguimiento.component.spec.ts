import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactoSeguimientoComponent } from './form-contacto-seguimiento.component';

describe('FormContactoSeguimientoComponent', () => {
  let component: FormContactoSeguimientoComponent;
  let fixture: ComponentFixture<FormContactoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormContactoSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContactoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
