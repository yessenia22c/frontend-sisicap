import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Tipo_usuarioService } from 'src/app/services/tipo_usuario.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Tipo_usuario } from 'src/app/models/tipo_usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-crear-actualizar-tipo-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './form-crear-actualizar-tipo-usuario.component.html',
  styleUrls: ['./form-crear-actualizar-tipo-usuario.component.css']
})
export class FormCrearActualizarTipoUsuarioComponent implements OnInit {
  formTipoUsuario: FormGroup;
  datoTipoUsuario$: Observable<Tipo_usuario> | undefined;
  tituloAccion: string = 'Crear seguimiento';
  botonAccion: string = 'Guardar';
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private tipoUsuarioService: Tipo_usuarioService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataTipoUsuario: Tipo_usuario,
    public dialogReferencia: MatDialogRef<FormCrearActualizarTipoUsuarioComponent>
    
  ) {
    this.formTipoUsuario = this.fb.group({
      id_tipo_usuario: [''],
      nombre_tipo_usuario: ['', Validators.required],
      descripcion: [''],
    });  
   }
  ngOnInit(): void {
    if(this.dataTipoUsuario){
      this.formTipoUsuario.patchValue({
        id_tipo_usuario: this.dataTipoUsuario.id_tipo_usuario,
        nombre_tipo_usuario: this.dataTipoUsuario.nombre_tipo_usuario,
        descripcion: this.dataTipoUsuario.descripcion
      })
    }
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
    
  }
  crearTipoUsuario() {
    console.log('FORMULARIO', this.formTipoUsuario.value);
    const modelo: Tipo_usuario = {
      id_tipo_usuario: 0,
      nombre_tipo_usuario: this.formTipoUsuario.value.nombre_tipo_usuario,
      descripcion:  this.formTipoUsuario.value.descripcion
      
    }
    if (this.dataTipoUsuario === null) {
      // if (this.formGrupoSeguimiento.value.fecha_fin_cap === null || this.formGrupoSeguimiento.value.fecha_fin_cap === '') {
      //   modelo.fecha_fin_cap = null; // Establecer el valor en null     
      // }
      this.datoTipoUsuario$ = this.tipoUsuarioService.crearTipoUsuario(modelo);
      this.datoTipoUsuario$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Tipo de usuario creado correctamente', 'Listo');
          this.dialogReferencia.close("Creado");
        }, error: (e) => {
          this.mostrarAlerta('No se pudo crear', 'Error');
        }
      });
      console.log('MODELO', modelo);
    }else{
      modelo.id_tipo_usuario = this.dataTipoUsuario.id_tipo_usuario;
      console.log('MODELO', modelo);
      this.datoTipoUsuario$ = this.tipoUsuarioService.actualizarTipoUsuario(modelo);
      this.datoTipoUsuario$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Tipo de usuario editado correctamente', 'Listo');
          this.dialogReferencia.close("editado");
        }, error: (e) => {
          this.mostrarAlerta('No se pudo editar', 'Error');
        }
      });
      console.log('MODELO', modelo);
    }
  }
}
