import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirContactosComponent } from './subir-contactos.component';

describe('SubirContactosComponent', () => {
  let component: SubirContactosComponent;
  let fixture: ComponentFixture<SubirContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubirContactosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
