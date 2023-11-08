import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsignarNuevoParticipanteComponent } from './form-asignar-nuevo-participante.component';

describe('FormAsignarNuevoParticipanteComponent', () => {
  let component: FormAsignarNuevoParticipanteComponent;
  let fixture: ComponentFixture<FormAsignarNuevoParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormAsignarNuevoParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsignarNuevoParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
