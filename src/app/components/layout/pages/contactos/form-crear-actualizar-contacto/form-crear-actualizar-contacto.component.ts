import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from 'src/app/services/contacto.service';
import { PersonaService } from 'src/app/services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreaContacto, EstadoContactos } from 'src/app/models/contacto';
import { Observable } from 'rxjs';
import { Ciudad, Pais, Sexo } from 'src/app/models/persona';
import { MatGridListModule } from '@angular/material/grid-list';
import { AllContacto, Contacto } from 'src/app/models/contactoAsignar';
import { ServicioActualizarCrearContactoSeguimientoService } from 'src/app/services/servicioActualizarCrearContactoSeguimiento.service';
import { ValidacionServiceService } from 'src/app/services/validacion-service.service';
import { Validaciones } from 'src/app/utils/validaciones';

@Component({
  selector: 'app-form-crear-actualizar-contacto',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  templateUrl: './form-crear-actualizar-contacto.component.html',
  styleUrls: ['./form-crear-actualizar-contacto.component.css'],
})
export class FormCrearActualizarContactoComponent {
  formContacto: FormGroup;
  tituloAccion: string = 'Crear contacto';
  botonAccion: string = 'Guardar';
  
  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;
  listaEstadoContacto$: Observable<EstadoContactos> | undefined;
  dataSourceContacto: Array<AllContacto> = [];

  datoCapaitacion$: Observable<CreaContacto> | undefined;
  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private personaService: PersonaService,
    private _snackBar: MatSnackBar,
    private validacionService: ValidacionServiceService,
    @Inject(MAT_DIALOG_DATA) public dataContacto: AllContacto,
    private servicioContactoSeguimiento: ServicioActualizarCrearContactoSeguimientoService,
    public dialogReferencia: MatDialogRef<FormCrearActualizarContactoComponent>
  ) {
    this.formContacto = this.fb.group({
      id_contacto: [''],
      nombre_apellidos: ['', Validators.required],
      numero_contacto: ['', Validators.required, Validaciones.validarNumeroTelefono(this.validacionService)],
      id_estado_contacto: [null],
      correo_contacto: [''],
      nombre_empresa: [''],
      profesion: [''],
      id_pais: [null],
      id_ciudad: [null],
      id_sexo: [null],
      intereses: [''],
      observaciones: ['']
    });
    if (this.dataContacto != null) {
      console.log('entrando a modo edicion');
      this.formContacto.get('numero_contacto')?.clearAsyncValidators();

    }else{
      this.formContacto.get('numero_contacto ')?.setAsyncValidators(Validaciones.validarNumeroTelefono(this.validacionService));
    }
    //this.formContacto.get('nro_ci')?.setAsyncValidators(Validaciones.validarNumeroTelefono(this.validacionService));
    this.formContacto.get('numero_contacto')?.updateValueAndValidity();
  }
  ngOnInit(): void {
    //Me suscribo a los datos que me llegan de la tabla
    // this.servicioContactoSeguimiento.listaContactos$.subscribe(data => {
    //   this.dataSourceContacto = data;
    //   console.log('DATOS QUE LLEGAN', data)
    // });
    this.listaPais$ = this.personaService.getListPais();
    this.listaCiudad$ = this.personaService.getListCiudad();
    this.listaSexo$ = this.personaService.getListSexo();
    this.listaEstadoContacto$ = this.contactoService.listarEstadosContacto();

    if (this.dataContacto) {
      this.formContacto.patchValue({
        nombre_apellidos: this.dataContacto.nombre_apellidos,
        numero_contacto: this.dataContacto.numero_contacto,
        id_estado_contacto: this.dataContacto.Estado?.id_estado_contacto,
        correo_contacto: this.dataContacto.correo_contacto,
        nombre_empresa: this.dataContacto.nombre_empresa,
        profesion: this.dataContacto.profesion,
        intereses: this.dataContacto.intereses,
        observaciones: this.dataContacto.observaciones,
        id_ciudad: this.dataContacto.Ciudad_contacto?.id_ciudad,
        id_sexo: this.dataContacto.Sexo_contacto?.id_sexo,
        id_pais: this.dataContacto.Pais_contacto?.id_pais,
      });
      this.tituloAccion = 'Editar datos de contacto';
      this.botonAccion = 'Actualizar';
    }
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  crearContacto() {
    // console.log(this.formContacto)
    console.log('FORMULARIO', this.formContacto.value);
    const modelo: CreaContacto = {
      id_contacto: 0,
      nombre_apellidos: this.formContacto.value.nombre_apellidos,
      numero_contacto: this.formContacto.value.numero_contacto,
      correo_contacto: this.formContacto.value.correo_contacto,    
      id_estado_contacto: this.formContacto.value.id_estado_contacto,
      nombre_empresa: this.formContacto.value.nombre_empresa,
      profesion: this.formContacto.value.profesion,
      intereses: this.formContacto.value.intereses,
      observaciones: this.formContacto.value.observaciones,
      id_ciudad: this.formContacto.value.id_ciudad,
      id_sexo: this.formContacto.value.id_sexo,
      id_pais: this.formContacto.value.id_pais,
      datosContacto: null,
    };
    if (this.dataContacto === null) {
      
      this.datoCapaitacion$ = this.contactoService.crearContacto(modelo);
      this.datoCapaitacion$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Contacto creado correctamente', 'Listo');
          this.contactoService.emitNuevoContacto(data.datosContacto);
          console.log('DATOS DESDFE EL SERVER CONTACTO', data.datosContacto)
          this.dialogReferencia.close('Creado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo crear', 'Error');
        },
      });
      console.log('MODELO', modelo);
    } else {

      
      modelo.id_contacto = this.dataContacto.id_contacto;
      console.log('MODELO ACTUALIZAR', modelo);
      this.datoCapaitacion$ = this.contactoService.actualizarContacto(modelo);
      this.datoCapaitacion$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Contacto editado correctamente', 'Listo');
          // Después de crear o actualizar el contacto con éxito
          // const update = { id: 123, contacto: { nombre_apellidos: 'Nuevo nombre' } };
          console.log('DATOS ACTUALIZAR DESDE EL SERVER CONTACTO', data.datosContacto)
          this.servicioContactoSeguimiento.actualizarContacto(data.datosContacto);

          console.log('DATOS CONTACTO', data);
          console.log('DATOS BUSCAR', this.dataSourceContacto )
          // const datoExistente = this.dataSourceContacto.find((item: any) => item.id_contacto === modelo.id_contacto);
          //   if (datoExistente) {
          //     console.log('Lo encontro')
          //     datoExistente.id_contacto = modelo.id_contacto;
          //     datoExistente.nombre_apellidos = modelo.nombre_apellidos;
          //     datoExistente.numero_contacto = modelo.numero_contacto;
          //     datoExistente.correo_contacto = modelo.correo_contacto;
          //     datoExistente.nombre_empresa = modelo.nombre_empresa;
          //     datoExistente.profesion = modelo.profesion;
          //     datoExistente.intereses = modelo.intereses;
          //     datoExistente.observaciones = modelo.observaciones;
          //     datoExistente.Ciudad_contacto!.id_ciudad = modelo.id_ciudad;
          //     datoExistente.Sexo_contacto!.id_sexo = modelo.id_sexo;
          //     datoExistente.Pais_contacto!.id_pais = modelo.id_pais;
          //     datoExistente.Estado!.id_estado_contacto = modelo.id_estado_contacto;


          //   } else {
          //     console.log('Fallo en el intento');
          //   }
          // // this.contactoService.emitNuevoContacto(data);
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo editar', 'Error');
        },
      });
      console.log('MODELO', modelo);
    }
    // this.capacitacionService.crearCapacitacion(modelo).subscribe({
    //   next: (data) => {
    //     this.mostrarAlerta('Capacitación creada correctamente', 'Listo');
    //     this.dialogReferencia.close("Creado");
    //   },error:(e)=>{
    //     this.mostrarAlerta('No se pudo crear', 'Error');
    //   }
    // })
    // console.log('MODELO', modelo);
  }

}
