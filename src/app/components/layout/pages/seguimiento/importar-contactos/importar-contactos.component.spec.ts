import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarContactosComponent } from './importar-contactos.component';

describe('ImportarContactosComponent', () => {
  let component: ImportarContactosComponent;
  let fixture: ComponentFixture<ImportarContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImportarContactosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
