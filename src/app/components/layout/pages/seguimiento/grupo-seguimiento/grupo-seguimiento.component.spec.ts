import { ComponentFixture, TestBed } from '@angular/core/testing';

import  GrupoSeguimientoComponent  from './grupo-seguimiento.component';

describe('GrupoSeguimientoComponent', () => {
  let component: GrupoSeguimientoComponent;
  let fixture: ComponentFixture<GrupoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GrupoSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
