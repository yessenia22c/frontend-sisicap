import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarInscritoComponent } from './dialog-eliminar-inscrito.component';

describe('DialogEliminarInscritoComponent', () => {
  let component: DialogEliminarInscritoComponent;
  let fixture: ComponentFixture<DialogEliminarInscritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarInscritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarInscritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
