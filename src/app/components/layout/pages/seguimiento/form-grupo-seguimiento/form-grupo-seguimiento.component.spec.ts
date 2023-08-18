import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGrupoSeguimientoComponent } from './form-grupo-seguimiento.component';

describe('FormGrupoSeguimientoComponent', () => {
  let component: FormGrupoSeguimientoComponent;
  let fixture: ComponentFixture<FormGrupoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormGrupoSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGrupoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
