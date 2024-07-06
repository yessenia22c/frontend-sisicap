import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorService } from 'src/app/services/Paginator.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioList, UsuariosSistema } from 'src/app/models/Usuarios';
import { FormCrearActualizarUsuarioComponent } from './form-crear-actualizar-usuario/form-crear-actualizar-usuario.component';
import { DialogEliminarUsuarioComponent } from './dialog-eliminar-usuario/dialog-eliminar-usuario.component';
import { RouterModule } from '@angular/router';
import { MostrarColumnDirective } from 'src/app/directivas/mostrar-column.directive';
import { ControlRolesDirective } from 'src/app/directivas/control-roles.directive';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule,
    ControlRolesDirective,
    MostrarColumnDirective
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ],
})
export default class UsuarioComponent {
  displayedColumns = ['id_usuario', 'foto_perfil', 'nombre_usuario', 'id_tipo_usuario','nombres_per','apellidos','nro_ci', 'correo', 'telefono'];
  informacionUsuarios$: Observable<UsuariosSistema> | undefined;
  dataSource = new  MatTableDataSource<UsuarioList>();
  filtroDatos = new MatTableDataSource<UsuarioList["empleado"]>();
  filterValue = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private usuariosService: UsuarioService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  agregaEditarBoton(tieneAcceso: boolean){
    if (tieneAcceso) {
      this.displayedColumns = [...this.displayedColumns, 'botonEditar']; // Forzar la detección de cambios
    }
  }
  agregaEliminarBoton(tieneAcceso: boolean){
    if (tieneAcceso) {
      this.displayedColumns = [...this.displayedColumns, 'botonEliminar']; // Forzar la detección de cambios
    }
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterData();
  }
  filterData() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  mostrarUsuarios() : void {
    this.informacionUsuarios$ = this.usuariosService.getUsuarios();
    this.informacionUsuarios$.subscribe({
      next: (data) => {
        this.dataSource.data = data.usuario;
      },
      error: (error) => {
        this._snackBar.open('Error al cargar los usuarios', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
  nuevoUsuario() : void {
    this.dialog.open(FormCrearActualizarUsuarioComponent,{
      disableClose: true,
      width: '400px',
    }).afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){
        this.mostrarUsuarios();
      }
    })
  }


  editarUsuario(datoUsuario: UsuarioList): void {
    console.log('DATA', datoUsuario);
    this.dialog.open(FormCrearActualizarUsuarioComponent, {

      disableClose: true,
      width: '400px',
      data: datoUsuario
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarUsuarios();
      }
    })
  }
  onImageError(event: any) {
    //../../../assets/img/defecto-usuario.png
    event.target.src = '../../../../../assets/img/defecto-usuario.png'; // Reemplaza con la ruta de tu imagen por defecto
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }

  dialogEliminarUsaurio(dataUsuario: UsuarioList) {

    this.dialog.open(DialogEliminarUsuarioComponent,{
      
      disableClose: true,
      data:  dataUsuario
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.usuariosService.eliminarUsuario(dataUsuario.id_usuario).subscribe({
          next: (resp) => { 
            console.log('RESP',resp);
            this.mostrarAlerta('Informacion del usuario eliminado correctamente', 'Listo');
            
            this.mostrarUsuarios();
          },
          error: (err) => {

            this.mostrarAlerta('Error al eliminar el usuario', 'Cerrar');
            console.log(err);
          }
        });
      }
    })
  }
}


