/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Tipo_usuarioService } from './tipo_usuario.service';

describe('Service: Tipo_usuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tipo_usuarioService]
    });
  });

  it('should ...', inject([Tipo_usuarioService], (service: Tipo_usuarioService) => {
    expect(service).toBeTruthy();
  }));
});
