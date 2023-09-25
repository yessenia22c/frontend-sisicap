import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsignarContactosComponent } from './dialog-asignar-contactos.component';

describe('DialogAsignarContactosComponent', () => {
  let component: DialogAsignarContactosComponent;
  let fixture: ComponentFixture<DialogAsignarContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogAsignarContactosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAsignarContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
