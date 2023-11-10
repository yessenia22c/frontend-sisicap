import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDarBajaCapacitacionComponent } from './dialog-dar-baja-capacitacion.component';

describe('DialogDarBajaCapacitacionComponent', () => {
  let component: DialogDarBajaCapacitacionComponent;
  let fixture: ComponentFixture<DialogDarBajaCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogDarBajaCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDarBajaCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
