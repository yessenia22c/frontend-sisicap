import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoList } from 'src/app/models/empleado';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorService } from 'src/app/services/Paginator.service';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatTableModule, MatPaginatorModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ],
})
export default class EmpleadoComponent {
  displayedColumns = ['id_empleado', 'nombres_per', 'apellidos', 'nro_ci','fecha_contrato', 'correo', 'telefono','empresa_empleadora', 'cargo','fecha_nac', 'id_pais', 'id_ciudad', 'id_sexo',  'accion'];
  informacionEmpleado$: Observable<Empleado> | undefined;
  dataSource = new  MatTableDataSource<EmpleadoList>();
  filtroDatos = new MatTableDataSource<EmpleadoList["PersonaEmpleado"]>();
  filterValue = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private empleadoService: EmpleadoService, 
    //public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
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
  
  mostrarEmpleados(){
    this.informacionEmpleado$ = this.empleadoService.getEmpleados();

    this.informacionEmpleado$.subscribe({
      next: (resp: Empleado) => {
        console.log('RESP',resp);
        this.dataSource.data = resp.Empleados;
        //Filter predicate ayuda a obtener los datos relevantes para la busqueda dentro del DataSource
        this.dataSource.filterPredicate = (data: EmpleadoList, filter: string) => {
          const personasData = data.PersonaEmpleado;
          const values = Object.values(personasData);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };

        console.log('DATASOURCE',this.dataSource);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  };


}
