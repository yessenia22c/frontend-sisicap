import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritosCapacitacionComponent } from './inscritos-capacitacion.component';

describe('InscritosCapacitacionComponent', () => {
  let component: InscritosCapacitacionComponent;
  let fixture: ComponentFixture<InscritosCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InscritosCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritosCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
