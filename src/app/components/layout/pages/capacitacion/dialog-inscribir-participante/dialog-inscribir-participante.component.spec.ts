import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInscribirParticipanteComponent } from './dialog-inscribir-participante.component';

describe('DialogInscribirParticipanteComponent', () => {
  let component: DialogInscribirParticipanteComponent;
  let fixture: ComponentFixture<DialogInscribirParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogInscribirParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInscribirParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
