import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCapacitacionComponent } from './get-capacitacion.component';

describe('GetCapacitacionComponent', () => {
  let component: GetCapacitacionComponent;
  let fixture: ComponentFixture<GetCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GetCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
