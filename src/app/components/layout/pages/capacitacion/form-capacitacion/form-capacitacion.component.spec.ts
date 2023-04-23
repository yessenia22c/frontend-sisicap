import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCapacitacionComponent } from './form-capacitacion.component';

describe('FormCapacitacionComponent', () => {
  let component: FormCapacitacionComponent;
  let fixture: ComponentFixture<FormCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
