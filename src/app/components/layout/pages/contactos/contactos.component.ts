import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AllContacto, Contacto, ListaContacto } from 'src/app/models/contactoAsignar';
import { ContactoService } from 'src/app/services/contacto.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { DialogAsignarContactosComponent } from './dialog-asignar-contactos/dialog-asignar-contactos.component';
import { PaginatorService } from 'src/app/services/Paginator.service';
import { FormCrearActualizarContactoComponent } from './form-crear-actualizar-contacto/form-crear-actualizar-contacto.component';
@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ]
})
export default class ContactosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'accion',
    'id_contacto',
    'nombre_apellidos',
    'numero_contacto',
    'correo_contacto',
    'nombre_empresa',
    'profesion',
    'intereses',
    'observaciones',
    'id_sexo',
    'id_ciudad',
    'id_pais',
    'botones'
  ];
  dataSource = new MatTableDataSource<AllContacto>();
 

  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  listaContactos$: Observable<Contacto> | undefined;
  filterValue = '';
  selection = new SelectionModel<AllContacto>(true, []);
  IdContactosSeleccionados: ListaContacto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private _dataStream = new ReplaySubject<AllContacto[]>(); // Para el ejemplo de la tabla
  constructor(
    private serviceContacto: ContactoService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
    ) {}
  ngOnInit(): void {
    this.mostrarContactos();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    if (this.filterValue.length > 0) {
      this.selection.select(...this.dataSource.filteredData);
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AllContacto): string {
    const listaIdContactos: ListaContacto[] = this.selection.selected.map(item => ({
      id_contacto: item.id_contacto
    }));
    this.IdContactosSeleccionados = listaIdContactos;
    //console.log('LISTA ID CONTACTOS', listaIdContactos);
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_contacto + 1}`;
    
  }

  //FIN CHECKBOX 

  ngAfterViewInit() {

    //DATASOURSE
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  filterData() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  mostrarContactos(){
    this.listaContactos$ = this.serviceContacto.getContactos();
    this.listaContactos$.subscribe( {
      next: (data: Contacto) => {
        this.dataSource.data = data.AllContacto;
        // this.dataSource.
        console.log('CONTACTOS DATA SOURCE', this.dataSource.data);

        this.dataSource.filterPredicate = (data: AllContacto, filter: string) => {
          const contactoDatas = data;

          const values = Object.values(contactoDatas);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };
      }
    });
  }
  mostrarAlerta(){

  };
  abirDialogAsignarContacto(){
    const dialogRef = this.dialog.open(DialogAsignarContactosComponent, {
      data: this.IdContactosSeleccionados
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        console.log('Dialog closed');
      }
    })
  }

  abirDialogCrearContacto(){
    this.dialog.open(FormCrearActualizarContactoComponent,{
      disableClose: true,
      width: '700px',
    }).afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){
        this.mostrarContactos();
        // this.mostrarContactos();
        // this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
        // this.dataSource.setData(this.dataToDisplay);
      }
    })
  };

  editarContacto(dataContacto: AllContacto) {
    
    this.dialog.open(FormCrearActualizarContactoComponent,{
      disableClose: true,
      width: '700px',
      data: dataContacto
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.mostrarContactos();
      }
    })
    
  }
}


