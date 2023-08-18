import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaParticipanteComponent } from './vista-participante.component';

describe('VistaParticipanteComponent', () => {
  let component: VistaParticipanteComponent;
  let fixture: ComponentFixture<VistaParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VistaParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
