import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarCapacitacionComponent } from './dialog-eliminar-capacitacion.component';

describe('DialogEliminarCapacitacionComponent', () => {
  let component: DialogEliminarCapacitacionComponent;
  let fixture: ComponentFixture<DialogEliminarCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
