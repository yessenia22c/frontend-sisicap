import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarSeguimientoComponent } from './dialog-eliminar-seguimiento.component';

describe('DialogEliminarSeguimientoComponent', () => {
  let component: DialogEliminarSeguimientoComponent;
  let fixture: ComponentFixture<DialogEliminarSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
