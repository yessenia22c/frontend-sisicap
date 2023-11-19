/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportarExcelService } from './ExportarExcel.service';

describe('Service: ExportarExcel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportarExcelService]
    });
  });

  it('should ...', inject([ExportarExcelService], (service: ExportarExcelService) => {
    expect(service).toBeTruthy();
  }));
});
