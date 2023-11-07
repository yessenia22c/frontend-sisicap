import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarUsuarioComponent } from './dialog-eliminar-usuario.component';

describe('DialogEliminarUsuarioComponent', () => {
  let component: DialogEliminarUsuarioComponent;
  let fixture: ComponentFixture<DialogEliminarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogEliminarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEliminarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
