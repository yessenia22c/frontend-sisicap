import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParticipanteAddEditComponent } from './form-participante-add-edit.component';

describe('FormParticipanteAddEditComponent', () => {
  let component: FormParticipanteAddEditComponent;
  let fixture: ComponentFixture<FormParticipanteAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormParticipanteAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParticipanteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
