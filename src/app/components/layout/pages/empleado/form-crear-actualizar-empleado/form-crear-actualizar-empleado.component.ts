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
import { Ciudad, Pais, Sexo } from 'src/app/models/persona';
import { Observable } from 'rxjs';
import { CargosList, EmpleadoList, EmpresasList, NuevoEmpleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';

import * as moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Validaciones } from 'src/app/utils/validaciones';
import { ValidacionServiceService } from 'src/app/services/validacion-service.service';

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
  selector: 'app-form-crear-actualizar-empleado',
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
  ],
  templateUrl: './form-crear-actualizar-empleado.component.html',
  styleUrls: ['./form-crear-actualizar-empleado.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},//SOLO PUESTO PARA QUE FUNCIONE EL CALENDARIO DEL DATEPICKER
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class FormCrearActualizarEmpleadoComponent implements OnInit {
  formEmpleado: FormGroup;
  //datos_UnaPersonaEmpleado: FormGroupName;
  tituloAccion: string = 'Registrar empleado';
  botonAccion: string = 'Guardar';

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;
  listaCargo$: Observable<CargosList> | undefined;
  listaEmpresa$: Observable<EmpresasList> | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);

  datoEmpleado$: Observable<NuevoEmpleado> | undefined;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private personaService: PersonaService,
    private validacionService: ValidacionServiceService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: EmpleadoList,
    public dialogReferencia: MatDialogRef<FormCrearActualizarEmpleadoComponent>
  ) {
    this.formEmpleado = this.fb.group({
      UnaPersonaEmpleado: this.fb.group({
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
      id_empleado: [''],
      id_cargo: [''],
      fecha_contrato: [''],
      id_empresa_empleadora: [''],
    });

    if (this.dataEmpleado != null) {
      console.log('entrando a modo edicion');
      this.formEmpleado.get('UnaPersonaEmpleado.nro_ci')?.clearAsyncValidators();
      this.formEmpleado.get('UnaPersonaEmpleado.correo')?.clearAsyncValidators();
    }else{
      console.log('entrando a modo crear');
      this.formEmpleado.get('UnaPersonaEmpleado.nro_ci')?.setAsyncValidators(Validaciones.validarCarnetIdentidad(this.validacionService));
      this.formEmpleado.get('UnaPersonaEmpleado.correo')?.setAsyncValidators(Validaciones.validarCorreo(this.validacionService));

    }
    this.formEmpleado.get('UnaPersonaEmpleado.nro_ci')?.updateValueAndValidity();
    this.formEmpleado.get('UnaPersonaEmpleado.correo')?.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.listaPais$ = this.personaService.getListPais();
    this.listaCiudad$ = this.personaService.getListCiudad();
    this.listaSexo$ = this.personaService.getListSexo();
    this.listaCargo$ = this.empleadoService.listaCargos();
    this.listaEmpresa$ = this.empleadoService.listaEmpresas();
    if (this.dataEmpleado){
      this.formEmpleado.patchValue({
        UnaPersonaEmpleado: {
          id_persona: this.dataEmpleado.PersonaEmpleado.id_persona,
          nombres_per: this.dataEmpleado.PersonaEmpleado.nombres_per,
          apellidos: this.dataEmpleado.PersonaEmpleado.apellidos,
          nro_ci: this.dataEmpleado.PersonaEmpleado.nro_ci,
          id_sexo: this.dataEmpleado.PersonaEmpleado.sexo.id_sexo,
          correo: this.dataEmpleado.PersonaEmpleado.correo,
          telefono: this.dataEmpleado.PersonaEmpleado.telefono,
          id_ciudad: this.dataEmpleado.PersonaEmpleado.ciudad.id_ciudad,
          fecha_nac: this.dataEmpleado.PersonaEmpleado.fecha_nac,
          id_pais: this.dataEmpleado.PersonaEmpleado.Pais.id_pais,
        },
        id_empleado: this.dataEmpleado.id_empleado,
        id_cargo: this.dataEmpleado.cargo.id_cargo,
        fecha_contrato: this.dataEmpleado.fecha_contrato,
        id_empresa_empleadora: this.dataEmpleado.empresa_empleadora.id_empresa,
      });
      this.tituloAccion = 'Editar datos del empleado';
      this.botonAccion = 'Actualizar';
    }
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
 
  }
  crearEmpleado(): void {
    const modelo: NuevoEmpleado = {
      UnaPersonaEmpleado: {
        id_persona: 0,
        nombres_per: this.formEmpleado.value.UnaPersonaEmpleado.nombres_per,
        apellidos: this.formEmpleado.value.UnaPersonaEmpleado.apellidos,
        nro_ci: this.formEmpleado.value.UnaPersonaEmpleado.nro_ci,
        id_sexo: this.formEmpleado.value.UnaPersonaEmpleado.id_sexo,
        correo: this.formEmpleado.value.UnaPersonaEmpleado.correo,
        telefono: this.formEmpleado.value.UnaPersonaEmpleado.telefono,
        id_ciudad: this.formEmpleado.value.UnaPersonaEmpleado.id_ciudad,
        fecha_nac: moment(
          this.formEmpleado.value.UnaPersonaEmpleado.fecha_nac
        ).format('YYYY-MM-DD'),
        id_pais: this.formEmpleado.value.UnaPersonaEmpleado.id_pais,
      },
      id_empleado: 0,
      id_cargo: this.formEmpleado.value.id_cargo,
      fecha_contrato:  moment(this.formEmpleado.value.fecha_contrato).format('YYYY-MM-DD'),
      id_empresa_empleadora: this.formEmpleado.value.id_empresa_empleadora,
    };
    if (this.dataEmpleado === null) {
      const fechaNac = this.formEmpleado.get('UnaPersonaEmpleado.fecha_nac')?.value;
      if (fechaNac === null || fechaNac === '' ) {
        modelo.UnaPersonaEmpleado.fecha_nac = null; // Establecer el valor en null     
      }
      console.log('MODELO CREATE EMPELADo',modelo);
      this.datoEmpleado$ = this.empleadoService.crearEmpleado(modelo);
      this.datoEmpleado$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleado creado correctamente', 'Cerrar');
          this.dialogReferencia.close("Creado");
        },error: (error) => {
          this.mostrarAlerta('Error al crear el empleado', 'Cerrar');
        }
      })
    }else{
      const fechaNac = this.formEmpleado.get('UnaPersonaEmpleado.fecha_nac')?.value;
      if (fechaNac === null || fechaNac === '' ) {
        modelo.UnaPersonaEmpleado.fecha_nac = null; // Establecer el valor en null     
      }
      modelo.UnaPersonaEmpleado.id_persona = this.dataEmpleado.PersonaEmpleado.id_persona;
      modelo.id_empleado = this.dataEmpleado.id_empleado;
      this.datoEmpleado$ = this.empleadoService.actualizaEmpleado(modelo);
      this.datoEmpleado$.subscribe({
        next: (data) => {
          this.mostrarAlerta('Datos de empleado actualizado correctamente', 'Cerrar');
          this.dialogReferencia.close("editado");
        },error: (error) => {
          this.mostrarAlerta('Error al actualizar el empleado, existen datos duplicados', 'Cerrar');
        }
      });
    }
  }
  mayorEdadValidator(control: FormControl) {
    const fechaNacimiento = control.value ? new Date(control.value) : null;
    let fechaActual = new Date();

    if (fechaNacimiento) {
      const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      const meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
      const dias = fechaActual.getDate() - fechaNacimiento.getDate();

      if (
        edad < 18 ||
        (edad === 18 && meses < 0) ||
        (edad === 18 && meses === 0 && dias < 0)
      ) {
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
