import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Ciudad, Pais, Persona, Sexo } from 'src/app/models/persona';
import { Observable, map } from 'rxjs';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { AsignarNuevoEmpleado, CargosList, EmpleadoList, EmpresasList, NuevoEmpleado, PersonaNoEmpleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';

import * as moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  selector: 'app-form-asignar-nuevo-empleado',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    NgSelectModule

  ],
  templateUrl: './form-asignar-nuevo-empleado.component.html',
  styleUrls: ['./form-asignar-nuevo-empleado.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class FormAsignarNuevoEmpleadoComponent implements OnInit {
  formEmpleado: FormGroup;
  //datos_UnaPersonaEmpleado: FormGroupName;
  tituloAccion: string = 'Asignar nuevo empleado';
  botonAccion: string = 'Guardar';
  mostrarDesplegable: boolean = false;

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;

  listaPersonas$: Observable<PersonaNoEmpleado> | undefined;
  listaCargo$: Observable<CargosList> | undefined;
  listaEmpresa$: Observable<EmpresasList> | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);

  datoEmpleado$: Observable<AsignarNuevoEmpleado> | undefined;
  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private personaService: PersonaService,
    private _snackBar: MatSnackBar,
    private config: NgSelectConfig,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: EmpleadoList,
    public dialogReferencia: MatDialogRef<FormAsignarNuevoEmpleadoComponent>
  ){
    this.config.notFoundText = 'No se encontraron resultados';
      this.config.appendTo = 'body';

    this.formEmpleado = this.fb.group({
      id_empleado: [''],
      id_persona: [''],
      id_cargo: [''],
      fecha_contrato: [''],
      id_empresa_empleadora: [''],
    });
  }

  ngOnInit(): void {
    this.listaPersonas$ = this.empleadoService.getPersonasNoEmpleados().pipe(
      map((persona: PersonaNoEmpleado) => ({
        ...persona,
        personasNoEmpleados: persona.personasNoEmpleados.map((persona) => ({
          ...persona,
          nombreCompleto: `${persona.nombres_per} ${persona.apellidos}`
        }))
      })
      ));
    this.listaCargo$ = this.empleadoService.listaCargos();
    this.listaEmpresa$ = this.empleadoService.listaEmpresas();
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }
  asignarEmpleado(): void {
    const modelo: AsignarNuevoEmpleado = {
      
      id_empleado: 0,
      id_persona: this.formEmpleado.value.id_persona,
      id_cargo: this.formEmpleado.value.id_cargo,
      fecha_contrato:  moment(this.formEmpleado.value.fecha_contrato).format('YYYY-MM-DD'),
      id_empresa_empleadora: this.formEmpleado.value.id_empresa_empleadora,
    };
    if (this.dataEmpleado === null) {
      console.log('MODELO CREATE ASignar EMPELADo',modelo);
      this.datoEmpleado$ = this.empleadoService.crearAsignarNuevoEmpleado(modelo);
      this.datoEmpleado$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleado creado correctamente', 'Cerrar');
          this.dialogReferencia.close("Creado");
        },error: (error) => {
          this.mostrarAlerta('Error al asignar a empleado', 'Cerrar');
        }
      })
    }else{
      
      this.mostrarAlerta('No se puede editar datos del empleado', 'Cerrar');
        
    }
  }

  cargarDatosPersona(event:any): void {
    console.log('DATOS PERSONA',event);
    // si hay una persona seleccionada ocultar desplegable
    if (event != null) {
      this.mostrarDesplegable = false;}
  }

  onSearch(event: any): void {
    console.log('SEARCH',event);
    if (event.term.length > 0) {
      this.mostrarDesplegable = true;
    }else{
      this.mostrarDesplegable = false;
    }
  }
}
