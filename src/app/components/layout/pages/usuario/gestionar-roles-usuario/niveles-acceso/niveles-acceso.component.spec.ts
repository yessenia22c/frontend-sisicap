import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelesAccesoComponent } from './niveles-acceso.component';

describe('NivelesAccesoComponent', () => {
  let component: NivelesAccesoComponent;
  let fixture: ComponentFixture<NivelesAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NivelesAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelesAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
