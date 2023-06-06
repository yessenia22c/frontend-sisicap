import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDeleteComponent } from './dialogo-delete.component';

describe('DialogoDeleteComponent', () => {
  let component: DialogoDeleteComponent;
  let fixture: ComponentFixture<DialogoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
