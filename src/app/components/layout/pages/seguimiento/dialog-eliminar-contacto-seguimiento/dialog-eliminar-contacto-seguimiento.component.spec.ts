import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarContactoSeguimientoComponent } from './dialog-eliminar-contacto-seguimiento.component';

describe('DialogEliminarContactoSeguimientoComponent', () => {
  let component: DialogEliminarContactoSeguimientoComponent;
  let fixture: ComponentFixture<DialogEliminarContactoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarContactoSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarContactoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
