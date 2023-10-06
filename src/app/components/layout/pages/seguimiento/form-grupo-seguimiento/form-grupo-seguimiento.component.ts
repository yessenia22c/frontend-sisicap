import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'; 
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; //SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER

import * as moment from 'moment';

import { CreaGrupoSeguimiento, GetSeguimiento, GrupoSeguimiento, UnGrupoSeguimiento } from 'src/app/models/seguimiento';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

import { Observable, map, startWith } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado, EmpleadoList } from 'src/app/models/empleado';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { Capacitacion } from 'src/app/models/capacitacion';

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
  selector: 'app-form-grupo-seguimiento',
  standalone: true,
  imports: [CommonModule, MatButtonModule,NgSelectModule, MatAutocompleteModule, MatDialogModule,
    MatGridListModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, 
    MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule],
  templateUrl: './form-grupo-seguimiento.component.html',
  styleUrls: ['./form-grupo-seguimiento.component.css']
})
export class FormGrupoSeguimientoComponent {
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  formGrupoSeguimiento: FormGroup;
  tituloAccion: string = 'Crear seguimiento';
  botonAccion: string = 'Guardar';
  listaEmpleados$: Observable<Empleado> | undefined;
  listaCapacitacion$: Observable<Capacitacion> | undefined;
  datoGrupoSeguimiento$: Observable<CreaGrupoSeguimiento> | undefined;

  filteredOptions!: Observable<string[]> ;
  constructor(
    private fb: FormBuilder,
    private seguimientoService: SeguimientoService,
    private empleadoService: EmpleadoService,
    private capacitacionService: CapacitacionService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataGrupoSeguimiento: GetSeguimiento,
    public dialogReferencia: MatDialogRef<FormGrupoSeguimientoComponent>) { 

    this.formGrupoSeguimiento = this.fb.group({
      nombre_seguimiento: ['', Validators.required],
      id_capacitacion: ['', Validators.required],
      id_empleado: ['', Validators.required]
    });  
    
}
mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
 
}
fechaActualCreacion = new Date().toISOString().substring(0, 10); //YYYY-MM-DD
crearSeguimiento() {
  // console.log(this.formGrupoSeguimiento)
  console.log('FORMULARIO', this.formGrupoSeguimiento.value);
  const modelo: CreaGrupoSeguimiento = {
    id_grupo_seguimiento: 0,
    nombre_seguimiento: this.formGrupoSeguimiento.value.nombre_seguimiento,
    fecha_creado: this.fechaActualCreacion,
    id_capacitacion: this.formGrupoSeguimiento.value.id_capacitacion,
    id_empleado:this.formGrupoSeguimiento.value.id_empleado,
      //nombre_categoria: this.formGrupoSeguimiento.value.nombre_categoria
    
  }
  if (this.dataGrupoSeguimiento === null) {
    // if (this.formGrupoSeguimiento.value.fecha_fin_cap === null || this.formGrupoSeguimiento.value.fecha_fin_cap === '') {
    //   modelo.fecha_fin_cap = null; // Establecer el valor en null     
    // }
    this.datoGrupoSeguimiento$ = this.seguimientoService.crearSeguimiento(modelo);
    this.datoGrupoSeguimiento$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Seguimiento creado correctamente', 'Listo');
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
    modelo.id_grupo_seguimiento = this.dataGrupoSeguimiento.UnGrupoSeguimiento.id_grupo_seguimiento;
    this.datoGrupoSeguimiento$ = this.seguimientoService.editarSeguimiento(this.dataGrupoSeguimiento.UnGrupoSeguimiento.id_grupo_seguimiento, modelo);
    this.datoGrupoSeguimiento$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Seguimiento editado correctamente', 'Listo');
        this.dialogReferencia.close("editado");
      }, error: (e) => {
        this.mostrarAlerta('No se pudo editar', 'Error');
      }
    });
    console.log('MODELO', modelo);
  }

}
ngOnInit(): void {
  this.listaEmpleados$ = this.empleadoService.getEmpleados().pipe(
    map((empleados: Empleado) => ({
      ...empleados,
      Empleados: empleados.Empleados.map((empleado) => ({
        ...empleado,
        nombreCompleto: `${empleado.persona.nombres_per} ${empleado.persona.apellidos}`
      }))
    })
  ));
  console.log('LISTA DE empleados', this.listaEmpleados$);
  this.listaCapacitacion$ = this.capacitacionService.getCapacitaciones();
  console.log('LISTA DE Capacitaciones', this.listaCapacitacion$);
  if (this.dataGrupoSeguimiento ) {
    console.log('DATA DIALOG GRUPO SEGUIMIENTO', this.dataGrupoSeguimiento);
    this.formGrupoSeguimiento.patchValue({
      nombre_seguimiento: this.dataGrupoSeguimiento.UnGrupoSeguimiento.nombre_seguimiento,
      //fecha_creado: this.dataGrupoSeguimiento.UnGrupoSeguimiento.fecha_creado,
      id_capacitacion: this.dataGrupoSeguimiento.UnGrupoSeguimiento.Capacitacion.id_capacitacion,
      id_empleado: this.dataGrupoSeguimiento.UnGrupoSeguimiento.Empleado.id_empleado
    });
    this.tituloAccion = 'Editar datos de seguimiento';
    this.botonAccion = 'Actualizar';
  }
  // this.filteredOptions = this.myControl.valueChanges.pipe(
  //   startWith(''),
  //   map(value => this._filter(value || '')),
  // );

}
// private _filter(value: string): string[] {
//   const filterValue = value.toLowerCase();
//   this.listaCapacitacion$ = this.capacitacionService.getCapacitaciones();
//   this.listaCapacitacion$.subscribe({
//     next: (resp: Capacitacion) => {
      
//     }
//   });
//   return this.listaEmpleados$.filter(option => option.toLowerCase().includes(filterValue));
}

