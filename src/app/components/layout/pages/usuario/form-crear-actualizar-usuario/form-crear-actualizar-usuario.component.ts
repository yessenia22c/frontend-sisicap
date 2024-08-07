import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// MAterial Modules para dialog
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NuevoUsuario, TiposUsuarios, UsuarioList } from 'src/app/models/Usuarios';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Empleado, EmpleadoList } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { ValidacionServiceService } from 'src/app/services/validacion-service.service';
import { Validaciones } from 'src/app/utils/validaciones';


@Component({
  selector: 'app-form-crear-actualizar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatAutocompleteModule

    ],
  templateUrl: './form-crear-actualizar-usuario.component.html',
  styleUrls: ['./form-crear-actualizar-usuario.component.css']
})
export class FormCrearActualizarUsuarioComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  foto!: File;

  myControl = new FormControl('');
  myControl2 = new FormControl('');
  formUsuario: FormGroup;
  tituloAccion: string = 'Crear usuario';
  botonAccion: string = 'Guardar';
  listaEmpleados$: Observable<Empleado> | undefined;
  listaTipoUsuarios$: Observable<TiposUsuarios> | undefined;
  datoUsuario$: Observable<NuevoUsuario> | undefined;
  escondeContra = true;
  //modoEdicion!: boolean;
  filteredOptions!: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private empleadoService: EmpleadoService,
    private validacionService: ValidacionServiceService,
    private config: NgSelectConfig,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataUsuario: UsuarioList,
    public dialogReferencia: MatDialogRef<FormCrearActualizarUsuarioComponent>) {
      this.config.notFoundText = 'No se encontraron resultados';
      this.config.appendTo = 'body';

    this.formUsuario = this.fb.group({
      id_usuario: [''],
      id_empleado: [{value: '' , disabled: this.dataUsuario != null }, Validators.required],
      archivo: [''],
      id_tipo_usuario: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      //nombre_usuario: ['', Validators.required,  Validaciones.validarNombreUsuario(this.validacionService)],
      contrasena_us: ['', Validators.required]
    });
    if (this.dataUsuario != null) {
      console.log('entrando a modo edicion');
      this.formUsuario.get('nombre_usuario')?.clearAsyncValidators();
    }else{
      console.log('entrando a modo crear');
      this.formUsuario.get('nombre_usuario')?.setAsyncValidators(Validaciones.validarNombreUsuario(this.validacionService));
    }
    this.formUsuario.get('nombre_usuario')?.updateValueAndValidity();

  }
  ngOnInit(): void {
    this.listaEmpleados$ = this.empleadoService.getEmpleados().pipe(
      map((empleados: Empleado) => ({
        ...empleados,
        Empleados: empleados.Empleados.map((empleado) => ({
          ...empleado,
          nombreCompleto: `${empleado.PersonaEmpleado.nombres_per} ${empleado.PersonaEmpleado.apellidos}`
        }))
      })
      ));

    this.listaTipoUsuarios$ = this.usuarioService.getTiposUsuarios();

    if (this.dataUsuario) {
      //this.modoEdicion = true;
      console.log('DATA DIALOG Usuario', this.dataUsuario);
      this.formUsuario.patchValue({
        id_usuario: this.dataUsuario.id_usuario,
        id_empleado:  this.dataUsuario.empleado.id_empleado,
        id_tipo_usuario: this.dataUsuario.tipo_usuario.id_tipo_usuario,
        nombre_usuario: this.dataUsuario.nombre_usuario,
        contrasena_us: '' //this.dataUsuario.contrasena_us
      });

      this.tituloAccion = 'Editar datos de usuario';
      this.botonAccion = 'Actualizar';
    }
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }
  //selectedFile: File | undefined;
  imageUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;

    if (selectedFile) {
      // Aquí puedes trabajar con el archivo seleccionado (por ejemplo, asignarlo a una propiedad del componente).
      // En tu caso, puedes asignarlo a this.foto.
      reader.readAsDataURL(selectedFile);
      this.foto = selectedFile;
    }
  }
  nuevoUsuario(): void {

    const formData = new FormData();
    formData.append('archivo', this.fileInput.nativeElement.files[0]);
    const modelo: NuevoUsuario = {
      id_usuario: 0,
      nombre_usuario: this.formUsuario.value.nombre_usuario,
      contrasena_us: this.formUsuario.value.contrasena_us,
      id_empleado:this.formUsuario.value.id_empleado,
      id_tipo_usuario:this.formUsuario.value.id_tipo_usuario,
        //nombre_categoria: this.formGrupoSeguimiento.value.nombre_categoria
      
    }
    if (this.dataUsuario === null) {

      
      //this.modoEdicion = false;
      //formData.append('modelo', JSON.stringify(modelo));
      
      //this.formUsuario.get('id_empleado')?.enable();
      // if (this.formGrupoSeguimiento.value.fecha_fin_cap === null || this.formGrupoSeguimiento.value.fecha_fin_cap === '') {
      //   modelo.fecha_fin_cap = null; // Establecer el valor en null     
      // }
      //this.datoUsuario$ = this.usuarioService.crearUsuario(modelo);
      this.datoUsuario$ = this.usuarioService.crearNuevoUsuario(modelo, this.foto);
      this.datoUsuario$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Usuario creado correctamente', 'Listo');
          this.dialogReferencia.close("Creado");
        }, error: (e) => {
          this.mostrarAlerta('No se pudo crear', 'Error');
        }
      });
      console.log('MODELO', modelo);
    }else{
      
      // if (this.formGrupoSeguimiento.value.fecha_fin_cap === null || this.formGrupoSeguimiento.value.fecha_fin_cap === '') {
      //   modelo.fecha_fin_cap = null; // Establecer el valor en null     
      // }
  
      //FUNCION PARA ACTUALIZAR LA FECHA
      //formData.append('modelo', JSON.stringify(modelo));
      //this.modoEdicion = true;
      //console.log('entrando a modo acti', this.modoEdicion);
      modelo.id_usuario = this.dataUsuario.id_usuario;
      this.datoUsuario$ = this.usuarioService.actualizarUsuario( modelo, this.foto);
      this.datoUsuario$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Usuario editado correctamente', 'Listo');
          this.dialogReferencia.close("editado");
        }, error: (e) => {
          this.mostrarAlerta('No se pudo editar', 'Error');
        }
      });
      console.log('MODELO', modelo);
    }
   }
   actualizarOpcionesSeleccionadas(event: any) {
    console.log('EVENTO', event);
   }
}
