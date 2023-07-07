import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'

import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// import { MAT_DATE_FORMATS } from '@angular/material/core';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; //SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER

import * as moment from 'moment';

import { CreaCapacitacion, EditarCapacitacion, GetCapacitacion, UnaCapacitacion } from 'src/app/models/capacitacion';
import { Categoria } from 'src/app/models/categoria';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { CategoriaService } from 'src/app/services/categoria.service';
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
  selector: 'app-form-capacitacion',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDialogModule, MatGridListModule,MatFormFieldModule, 
    ReactiveFormsModule,MatInputModule, MatSelectModule,MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule],
  templateUrl: './form-capacitacion.component.html',
  styleUrls: ['./form-capacitacion.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class FormCapacitacionComponent implements OnInit {

  formCap: FormGroup;
  tituloAccion: string = 'Crear Capacitación';
  botonAccion: string = 'Guardar';
  Listcategoria$: Observable<Categoria> | undefined;
  datoCapaitacion$: Observable<CreaCapacitacion> | undefined;
  constructor(
    private fb: FormBuilder,
    private capacitacionService: CapacitacionService,
    private categoriaService: CategoriaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataCapacitacion: GetCapacitacion,
    public dialogReferencia: MatDialogRef<FormCapacitacionComponent>) {

    this.formCap = this.fb.group({
      nombre_capacitacion: ['', Validators.required],
      fecha_inicio_cap: ['', Validators.required],
      fecha_fin_cap: [''],
      cantidad_modulos: ['',[Validators.min(0), Validators.max(20)]],
      id_categoria: ['', Validators.required]
    });  
    
}
mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
 
}
crearCapacitacion() {
  // console.log(this.formCap)
  console.log('FORMULARIO', this.formCap.value);
  const modelo: CreaCapacitacion = {
    id_capacitacion: 0,
    nombre_capacitacion: this.formCap.value.nombre_capacitacion,
    fecha_inicio_cap: moment(this.formCap.value.fecha_inicio_cap).format('YYYY-MM-DD'),
    fecha_fin_cap: moment(this.formCap.value.fecha_fin_cap).format('YYYY-MM-DD'),
    cantidad_modulos: this.formCap.value.cantidad_modulos ? this.formCap.value.cantidad_modulos : 0,
    id_categoria: this.formCap.value.id_categoria,
      //nombre_categoria: this.formCap.value.nombre_categoria
    
  }
  if (this.dataCapacitacion === null) {
    if (this.formCap.value.fecha_fin_cap === null || this.formCap.value.fecha_fin_cap === '') {
      modelo.fecha_fin_cap = null; // Establecer el valor en null     
    }
    this.datoCapaitacion$ = this.capacitacionService.crearCapacitacion(modelo);
    this.datoCapaitacion$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Capacitacion creada correctamente', 'Listo');
        this.dialogReferencia.close("Creado");
      }, error: (e) => {
        this.mostrarAlerta('No se pudo crear', 'Error');
      }
    });
    console.log('MODELO', modelo);
  }else{
    if (this.formCap.value.fecha_fin_cap === null || this.formCap.value.fecha_fin_cap === '') {
      modelo.fecha_fin_cap = null; // Establecer el valor en null     
    }
    modelo.id_capacitacion = this.dataCapacitacion.UnaCapacitacion.id_capacitacion;
    this.datoCapaitacion$ = this.capacitacionService.editarCapacitacion(this.dataCapacitacion.UnaCapacitacion.id_capacitacion, modelo);
    this.datoCapaitacion$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Capacitacion editada correctamente', 'Listo');
        this.dialogReferencia.close("editado");
      }, error: (e) => {
        this.mostrarAlerta('No se pudo editar', 'Error');
      }
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
ngOnInit(): void {
  this.Listcategoria$ = this.categoriaService.getListCategoria();
  console.log('LISTA DE CATEGORIAS', this.Listcategoria$);

  if (this.dataCapacitacion ) {
    
    this.formCap.patchValue({
      nombre_capacitacion: this.dataCapacitacion.UnaCapacitacion.nombre_capacitacion,
      fecha_inicio_cap: this.dataCapacitacion.UnaCapacitacion.fecha_inicio_cap,
      fecha_fin_cap: this.dataCapacitacion.UnaCapacitacion.fecha_fin_cap,
      cantidad_modulos: this.dataCapacitacion.UnaCapacitacion.cantidad_modulos,
      id_categoria: this.dataCapacitacion.UnaCapacitacion.Categoria.id_categoria
    });
    this.tituloAccion = 'Editar datos capacitacion';
    this.botonAccion = 'Actualizar';
  }
}
}
