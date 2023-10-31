import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarEmpleadoComponent } from './dialog-eliminar-empleado.component';

describe('DialogEliminarEmpleadoComponent', () => {
  let component: DialogEliminarEmpleadoComponent;
  let fixture: ComponentFixture<DialogEliminarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
