import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página';
  override nextPageLabel     = 'Siguiente';
  override previousPageLabel = 'Anterior';

  constructor() {
    super();
  }

}
