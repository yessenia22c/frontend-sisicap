import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { AllContactosSeguimiento, ContactosSeguimiento, UnSeguimiento } from 'src/app/models/seguimiento';

//MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatorService } from 'src/app/services/Paginator.service';

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
  styleUrls: ['./grupo-seguimiento.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ]
})
export default class GrupoSeguimientoComponent implements OnInit {
  displayedColumns: string[] = [
    'nro',
    'nombre_apellidos', 
    'numero_contacto', 
    'correo_contacto',
    'fecha_actualizacion',
    'prox_llamada',
    'id_tipo_seguimiento',
    'nombre_empresa',
    'profesion',
    'intereses',
    'observaciones',
    'id_sexo',
    'id_ciudad',
    'id_pais',
    'id_estado_contacto'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  listContactos$: Observable<ContactosSeguimiento> | undefined;
  dataSource = new MatTableDataSource<AllContactosSeguimiento>();
  resultsLength = 0;

  filterValue = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private seguimientoService: SeguimientoService,
  ) { }

  UnSeguimiento$: Observable<UnSeguimiento> | undefined;
  ngOnInit() {
    this.verSeguimiento();
    this.mostrarContactos();
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  filterData() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  mostrarContactos() {
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];

    this.listContactos$ =  this.seguimientoService.verContactosSeguimiento(id_grupo_seguimiento);
    this.listContactos$.subscribe({
      next: (data: ContactosSeguimiento) => {
        this.dataSource.data = data.AllContactosSeguimiento;
        console.log('CONTACTOS DATA SOURCE', this.dataSource.data);
        this.dataSource.filterPredicate = (data: AllContactosSeguimiento, filter: string) => {
          const contactoDatas = data.Contactos;

          const values = Object.values(contactoDatas);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };
      }
    });

  }



}
