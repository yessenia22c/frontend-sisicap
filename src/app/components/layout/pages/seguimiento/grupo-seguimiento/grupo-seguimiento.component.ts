import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { UnSeguimiento } from 'src/app/models/seguimiento';

//MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-grupo-seguimiento',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule,RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './grupo-seguimiento.component.html',
  styleUrls: ['./grupo-seguimiento.component.css']
})
export default class GrupoSeguimientoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  resultsLength = 12;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private seguimientoService: SeguimientoService,
  ) { }

  UnSeguimiento$: Observable<UnSeguimiento> | undefined;
  ngOnInit() {
    this.verSeguimiento();
  }
  verSeguimiento() {
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];

    this.UnSeguimiento$ = this.seguimientoService.verGrupoSeguimiento(id_grupo_seguimiento);
    this.UnSeguimiento$.pipe(
      tap((data: UnSeguimiento) => {

        console.log('GRUPO SEGUMIENTO', data);
      }
      ), catchError((err) => {
        console.log('ERROR', err);
        return of([]);
      })
    ).subscribe();
  }



}
