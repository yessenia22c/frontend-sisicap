import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarTipoUsuarioComponent } from './dialog-eliminar-tipo-usuario.component';

describe('DialogEliminarTipoUsuarioComponent', () => {
  let component: DialogEliminarTipoUsuarioComponent;
  let fixture: ComponentFixture<DialogEliminarTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarTipoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
