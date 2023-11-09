import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tipo_usuarioService } from 'src/app/services/tipo_usuario.service';
import { PaginatorService } from 'src/app/services/Paginator.service';
import { TipoUsuarioList, Tipo_usuario } from 'src/app/models/tipo_usuario';
import { Observable } from 'rxjs';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-gestionar-roles-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,  
    RouterModule
  ],
  templateUrl: './gestionar-roles-usuario.component.html',
  styleUrls: ['./gestionar-roles-usuario.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ],
})
export default class GestionarRolesUsuarioComponent  implements OnInit {

  displayedColumns = ['id_tipo_usuario', 'nombre_tipo_usuario', 'descripcion', 'accion'];
  informacionTiposUsuarios$: Observable<TipoUsuarioList> | undefined;
  dataSource = new  MatTableDataSource<Tipo_usuario>();
  filtroDatos = new MatTableDataSource<TipoUsuarioList["allTipos_usuario"]>();
  filterValue = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  constructor(private tipoUsuarioService: Tipo_usuarioService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    
  }

  ngOnInit(): void {
    this.mostrarTipoUsuarios();
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
  mostrarTipoUsuarios(){
    this.informacionTiposUsuarios$ = this.tipoUsuarioService.getTiposUsuarios();
    this.informacionTiposUsuarios$.subscribe({
      next: (data) => {
        this.dataSource.data = data.allTipos_usuario;
      },
      error: (error) => {
        this._snackBar.open('Error al cargar los usuarios', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    })
  }
}
