import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';

import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, Form, FormGroupName } from '@angular/forms'

import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';

import { MatLabel } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; //SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER

import * as moment from 'moment';

import { PersonaService } from 'src/app/services/persona.service';
import { Persona, AllPersona, Pais, Ciudad, Sexo } from 'src/app/models/persona';
import { creaPersona } from 'src/app/models/persona';
import { Observable, map, of, startWith } from 'rxjs';
import { AllParticipante, NuevoParticipante } from 'src/app/models/participante';
import { ParticipanteService } from 'src/app/services/participante.service';

import jwt_decode from 'jwt-decode';
import decode  from 'jwt-decode'
import { Validaciones } from 'src/app/utils/validaciones';
import { ValidacionServiceService } from 'src/app/services/validacion-service.service';
export interface User {
  name: string;
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}
@Component({
  selector: 'app-form-participante-add-edit',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, 
      MatSelectModule, MatOptionModule, MatFormFieldModule,
      MatInputModule, MatGridListModule, MatAutocompleteModule, MatDatepickerModule,MatNativeDateModule, MatRippleModule],
  templateUrl: './form-participante-add-edit.component.html',
  styleUrls: ['./form-participante-add-edit.component.css'],  
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})


export class FormParticipanteAddEditComponent implements OnInit {
  formParticipante: FormGroup;
  //datos_personas: FormGroupName;
  tituloAccion: string = 'Registrar participante';
  botonAccion: string = 'Guardar';

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];

  filteredOptions!: Observable<User[]>;
  //datoPersona$: Observable<creaPersona> | undefined;
  datoParticipante$: Observable<NuevoParticipante> | undefined;
  

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private participanteService: ParticipanteService,
    private validacionService: ValidacionServiceService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataParticipante: AllParticipante,
    public dialogReferencia: MatDialogRef<FormParticipanteAddEditComponent>) {
    
    this.formParticipante = this.fb.group({
      
       Personas: this.fb.group({
         id_persona: [''],
         nombres_per: ['', Validators.required],
         apellidos: ['', Validators.required],
         nro_ci: ['', Validators.required],
         id_sexo: ['', Validators.required],
         correo: ['', [Validators.required, Validators.email]],
         telefono: [''],
         id_ciudad: [''],
         fecha_nac: ['', this.mayorEdadValidator],
         id_pais: ['', Validators.required],
       }),
      id_participante: [''],
      ocupacion: [''],

    });  

    if (this.dataParticipante != null) {
      console.log('entrando a modo edicion');
      this.formParticipante.get('Personas.nro_ci')?.clearAsyncValidators();
      this.formParticipante.get('Personas.correo')?.clearAsyncValidators();
    }else{
      console.log('entrando a modo crear');
      this.formParticipante.get('Personas.nro_ci')?.setAsyncValidators(Validaciones.validarCarnetIdentidad(this.validacionService));
      this.formParticipante.get('Personas.correo')?.setAsyncValidators(Validaciones.validarCorreo(this.validacionService));

    }
    this.formParticipante.get('Personas.nro_ci')?.updateValueAndValidity();
    this.formParticipante.get('Personas.correo')?.updateValueAndValidity();
}


mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
 
}

crearParticipante() {
  const token = localStorage.getItem('access_token');
  
    // PAra verificar que hay ingresado en le formulario
    console.log('FORMULARIO', this.formParticipante.value);

    const modelo: NuevoParticipante = {
      Personas: {
        id_persona: this.formParticipante.value.Personas.id_persona,
        nombres_per: this.formParticipante.value.Personas.nombres_per,
        apellidos: this.formParticipante.value.Personas.apellidos,
        nro_ci: this.formParticipante.value.Personas.nro_ci,
        id_sexo: this.formParticipante.value.Personas.id_sexo,
        correo: this.formParticipante.value.Personas.correo,
        telefono: this.formParticipante.value.Personas.telefono,
        id_ciudad: this.formParticipante.value.Personas.id_ciudad,
        fecha_nac: moment(
          this.formParticipante.value.Personas.fecha_nac
        ).format('YYYY-MM-DD'),
        id_pais: this.formParticipante.value.Personas.id_pais,
      },
      id_participante:       this.formParticipante.value.id_participante,
      //id_registrante: id_regis, //SOLO PARA QUE NO DE ERROR
      ocupacion: this.formParticipante.value.ocupacion,
    };
    //VALIDACION DE FECHA NULLA

    if (this.dataParticipante === null) {
      //si es null entonces crear

      const fechaNac = this.formParticipante.get('Personas.fecha_nac')?.value;
      if (fechaNac === null || fechaNac === '') {
        modelo.Personas.fecha_nac = null; // Establecer el valor en null
      }
      this.datoParticipante$ =
        this.participanteService.crearParticipante(modelo);
      this.datoParticipante$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Participante creada correctamente', 'Listo');
          this.dialogReferencia.close('Creado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo crear', 'Error');
        },
      });
      console.log('MODEL CREAR', modelo);
    } else {
      //si es diferente de null entonces editar
      //VALIDAR SI EL CAMPO DE FECHA ESTA VACIO
      const fechaNac = this.formParticipante.get('Personas.fecha_nac')?.value;
      if (fechaNac === null || fechaNac === '') {
        modelo.Personas.fecha_nac = null; // Establecer el valor en null
      }
      //modelo.id_participante = this.dataParticipante.id_participante;
      this.datoParticipante$ = this.participanteService.actualizaParticipante(this.dataParticipante.id_participante, modelo);
      console.log('MODELO ACTUALIZAR', modelo);
      this.datoParticipante$.subscribe({
        next: (data) => {
          this.mostrarAlerta(
            'Datos de participante actualizados correctamente',
            'Listo'
          );
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo editar, existen datos duplicados.', 'Error');
          console.log('MODELO ACTUALIZAR error', modelo);
        },
      });
    }
  

  

}

mayorEdadValidator(control: FormControl) {
  
  const fechaNacimiento = control.value ? new Date(control.value) : null;
  let fechaActual = new Date();
  
  if (fechaNacimiento ) {
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    const dias = fechaActual.getDate() - fechaNacimiento.getDate();

    if (edad < 18 || (edad === 18 && meses < 0) || (edad === 18 && meses === 0 && dias < 0)) {
      return { mayorEdad: true };
    }
  }
  fechaActual = new Date(1920, 0, 1);
  if (fechaNacimiento && fechaNacimiento < fechaActual) {
    return { fechaMinima: true };
    
  }
  

  return null;
}


fechaMinimaValidator(control: FormControl) {
  const fechaNacimiento = control.value ? new Date(control.value) : null;
  const fechaMinima = new Date(1920, 0, 1);

  if (fechaNacimiento && fechaNacimiento < fechaMinima) {
    return { fechaMinima: true };
  }
  
  return null;
}

ngOnInit(): void {
   this.listaPais$ = this.personaService.getListPais();
    this.listaCiudad$ = this.personaService.getListCiudad();
   this.listaSexo$ = this.personaService.getListSexo();

  if (this.dataParticipante){
    console.log('DATA PARTICIPANTE RECIBIDO', this.dataParticipante);
    console.log('DATA PARTICIPANTE FECHA NAC', this.dataParticipante.Personas.fecha_nac);
    this.formParticipante.patchValue({
      Personas: {
        id_persona: this.dataParticipante.Personas.id_persona,
        nombres_per: this.dataParticipante.Personas.nombres_per,
        apellidos: this.dataParticipante.Personas.apellidos,
        nro_ci: this.dataParticipante.Personas.nro_ci,
        id_sexo: this.dataParticipante.Personas.sexo.id_sexo,
        correo: this.dataParticipante.Personas.correo,
        telefono: this.dataParticipante.Personas.telefono,
        id_ciudad: this.dataParticipante.Personas.ciudad.id_ciudad,
        fecha_nac:   this.dataParticipante.Personas.fecha_nac,
        id_pais: this.dataParticipante.Personas.Pais.id_pais,

      },
      id_participante: this.dataParticipante.id_participante,
      id_registrante: this.dataParticipante.usuario.id_usuario,
      ocupacion: this.dataParticipante.ocupacion,
      

    })
    this.tituloAccion = 'Editar datos personales';
    this.botonAccion = 'Actualizar';
  }
  //console.log('LISTA DE CATEGORIAS', this.Listcategoria$);
}
}


