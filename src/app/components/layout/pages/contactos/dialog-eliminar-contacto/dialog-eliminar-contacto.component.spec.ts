import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarContactoComponent } from './dialog-eliminar-contacto.component';

describe('DialogEliminarContactoComponent', () => {
  let component: DialogEliminarContactoComponent;
  let fixture: ComponentFixture<DialogEliminarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
