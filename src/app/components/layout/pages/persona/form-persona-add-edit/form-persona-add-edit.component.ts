import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'

import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';


import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; //SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER

import * as moment from 'moment';

import { PersonaService } from 'src/app/services/persona.service';
import { Persona, AllPersona, Pais, Ciudad, Sexo, AllPaises, AllCiudades, AllSexos } from 'src/app/models/persona';
import { creaPersona } from 'src/app/models/persona';
import { Observable, of } from 'rxjs';

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
  selector: 'app-form-persona-add-edit',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDialogModule, MatGridListModule,MatFormFieldModule,
    ReactiveFormsModule,MatInputModule, MatSelectModule,MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule
  ],
  templateUrl: './form-persona-add-edit.component.html',
  styleUrls: ['./form-persona-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})

export class FormPersonaAddEditComponent implements OnInit {
  formPersona: FormGroup;
  tituloAccion: string = 'Registrar datos personales';
  botonAccion: string = 'Guardar';

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;


  datoPersona$: Observable<creaPersona> | undefined;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataPersona: AllPersona,
    public dialogReferencia: MatDialogRef<FormPersonaAddEditComponent>) {
    
    this.formPersona = this.fb.group({
      nombres_per: ['', Validators.required],
      apellidos: ['', Validators.required],
      nro_ci: ['', Validators.required],
      id_sexo: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: [''],
      id_ciudad: [''],
      fecha_nac: ['', this.mayorEdadValidator],
      id_pais: ['', Validators.required],    
    });  
}


mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
 
}
crearPersona() {
  // console.log(this.formPersona)
  console.log('FORMULARIO', this.formPersona.value);
  const modelo: creaPersona = {
    id_persona: 0, //SOLO PARA QUE NO DE ERROR
    nombres_per: this.formPersona.value.nombres_per,
    apellidos: this.formPersona.value.apellidos,
    nro_ci:        this.formPersona.value.nro_ci,
    id_sexo:         this.formPersona.value.id_sexo,
    correo:          this.formPersona.value.correo,
    telefono:        this.formPersona.value.telefono,
    id_ciudad:       this.formPersona.value.id_ciudad,
    fecha_nac:       moment(this.formPersona.value.fecha_nac).format('YYYY-MM-DD'),
    id_pais:         this.formPersona.value.id_pais,
  }
  
  if (this.dataPersona === null) {
    // Verificar si el campo de fecha está vacío
    if (this.formPersona.value.fecha_nac === null || this.formPersona.value.fecha_nac === '') {
      modelo.fecha_nac = null; // Establecer el valor en null
      //this.formPersona.value.fecha_nac = ''; // Establecer el valor en un string vacío
    }
    this.datoPersona$ = this.personaService.crearPersona(modelo);
    this.datoPersona$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Persona creada correctamente', 'Listo');
        this.dialogReferencia.close("Creado");
      }, error: (e) => {
        this.mostrarAlerta('No se pudo crear', 'Error');
      }
    });
    console.log('MODELO', modelo);
  }else{
    //VALIDAR SI EL CAMPO DE FECHA ESTA VACIO
    if (this.formPersona.value.fecha_nac === null || this.formPersona.value.fecha_nac === '') {
      modelo.fecha_nac = null; // Establecer el valor en null     
    }
    modelo.id_persona = this.dataPersona.id_persona;
    this.datoPersona$ = this.personaService.actualizaPersona(this.dataPersona.id_persona,modelo);
    console.log('MODELO', modelo);  
    this.datoPersona$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Datos personales actualizados correctamente', 'Listo');
        this.dialogReferencia.close("editado");
      }, error: (e) => {
        this.mostrarAlerta('No se pudo editar', 'Error');
      }
    });
    console.log('MODELO ACTUALIZAR', modelo);
  }

}

mayorEdadValidator(control: FormControl) {
  if (control.value === null || control.value === '') {
    
    return null;
  } else {
    const fechaNacimiento = control.value ? new Date(control.value) : null;
    let fechaActual = new Date();

    if (fechaNacimiento) {
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
  
}


ngOnInit(): void {
   this.listaPais$ = this.personaService.getListPais();
  this.listaCiudad$ = this.personaService.getListCiudad();
   this.listaSexo$ = this.personaService.getListSexo();

  if (this.dataPersona){
    this.formPersona.patchValue({
      id_persona:         this.dataPersona.id_persona,
      nombres_per:        this.dataPersona.nombres_per,
      apellidos:          this.dataPersona.apellidos,
      nro_ci:             this.dataPersona.nro_ci,
      id_sexo:            this.dataPersona.sexo.id_sexo,
      correo:             this.dataPersona.correo,
      telefono:           this.dataPersona.telefono,
      id_ciudad:          this.dataPersona.ciudad.id_ciudad,
      fecha_nac:          this.dataPersona.fecha_nac,
      id_pais:            this.dataPersona.Pais.id_pais,

    })
    this.tituloAccion = 'Editar datos personales';
    this.botonAccion = 'Actualizar';
  }
  //console.log('LISTA DE CATEGORIAS', this.Listcategoria$);
}

}
