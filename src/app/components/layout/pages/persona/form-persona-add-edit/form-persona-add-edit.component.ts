import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'

import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';


import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; //SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER

import * as moment from 'moment';

import { PersonaService } from 'src/app/services/persona.service';
import { Persona, AllPersona, Pais, Ciudad, Sexo } from 'src/app/models/persona';
import { creaPersona } from 'src/app/models/persona';
import { Observable } from 'rxjs';

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
  formCap: FormGroup;
  tituloAccion: string = 'Registrar datos personales';
  botonAccion: string = 'Guardar';
  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    //private pais: CategoriaService,
    private _snackBar: MatSnackBar,
    public dialogReferencia: MatDialogRef<FormPersonaAddEditComponent>) {

    this.formCap = this.fb.group({
      nombres_per: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
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
  // console.log(this.formCap)
  console.log('FORMULARIO', this.formCap.value);
  const modelo: creaPersona = {
    //id_capacitacion: undefined,
    nombres_per: this.formCap.value.nombres_per,
    primer_apellido: this.formCap.value.primer_apellido,
    segundo_apellido: this.formCap.value.segundo_apellido,
    nro_ci:        this.formCap.value.nro_ci,
    id_sexo:         this.formCap.value.id_sexo,
    correo:          this.formCap.value.correo,
    telefono:        this.formCap.value.telefono,
    id_ciudad:       this.formCap.value.id_ciudad,
    fecha_nac:       moment(this.formCap.value.fecha_nac).format('YYYY-MM-DD'),
    id_pais:         this.formCap.value.id_pais,
    
      //nombre_categoria: this.formCap.value.nombre_categoria
    
  }
  this.personaService.crearPersona(modelo).subscribe({
    next: (data) => {  
      this.mostrarAlerta('Persona creada correctamente', 'Listo');
      this.dialogReferencia.close("Creado");
    },error:(e)=>{
      this.mostrarAlerta('No se pudo crear', 'Error');
    }
  })
  console.log('MODELO', modelo);
}
mayorEdadValidator(control: FormControl) {
  const fechaNacimiento = new Date(control.value);
  const fechaActual = new Date();

  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
  const dias = fechaActual.getDate() - fechaNacimiento.getDate();

  if (edad < 18 || (edad === 18 && meses < 0) || (edad === 18 && meses === 0 && dias < 0)) {
    return { mayorEdad: true };
  }

  return null;
}
ngOnInit(): void {
  this.listaPais$ = this.personaService.getListPais();
  this.listaCiudad$ = this.personaService.getListCiudad();
  this.listaSexo$ = this.personaService.getListSexo();
  //console.log('LISTA DE CATEGORIAS', this.Listcategoria$);
}

}
