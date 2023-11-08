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
import { AllParticipante, AsignarNuevoParticipante, PersonaNoParticipante } from 'src/app/models/participante';
import decode  from 'jwt-decode'
import { ParticipanteService } from 'src/app/services/participante.service';
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
  selector: 'app-form-asignar-nuevo-participante',
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
  templateUrl: './form-asignar-nuevo-participante.component.html',
  styleUrls: ['./form-asignar-nuevo-participante.component.css']
})
export class FormAsignarNuevoParticipanteComponent implements OnInit {
  formParticipante: FormGroup;
  //datos_UnaPersonaEmpleado: FormGroupName;
  tituloAccion: string = 'Asignar nuevo empleado';
  botonAccion: string = 'Guardar';

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;

  listaPersonas$: Observable<PersonaNoParticipante> | undefined;
  listaCargo$: Observable<CargosList> | undefined;
  listaEmpresa$: Observable<EmpresasList> | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);

  datoParticipante$: Observable<AsignarNuevoParticipante> | undefined;
  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private participanteService: ParticipanteService,
    private _snackBar: MatSnackBar,
    private config: NgSelectConfig,
    @Inject(MAT_DIALOG_DATA) public dataParticipante: AllParticipante,
    public dialogReferencia: MatDialogRef<FormAsignarNuevoParticipanteComponent>
  ){
    this.config.notFoundText = 'No se encontraron resultados';
      this.config.appendTo = 'body';

    this.formParticipante = this.fb.group({
      id_participante: [''],
      id_persona: [''],
      ocupacion: ['']
    });
  }

  ngOnInit(): void {
    this.listaPersonas$ = this.participanteService.getPersonasNoParticipantes().pipe(
      map((persona: PersonaNoParticipante) => ({
        ...persona,
        personasNoParticipantes: persona.personasNoParticipantes.map((persona) => ({
          ...persona,
          nombreCompleto: `${persona.nombres_per} ${persona.apellidos}`
        }))
      })
      ));
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
    if (token) {
      const decodedToken: any = decode(token);
      console.log('DECODED TOKEN', decodedToken);
      const id_regis = decodedToken.ius;


      // PAra verificar que hay ingresado en le formulario
      console.log('FORMULARIO', this.formParticipante.value);

      const modelo: AsignarNuevoParticipante = {
        id_participante: 0,
        id_persona: this.formParticipante.value.id_persona,
        id_registrante: id_regis, //SOLO PARA QUE NO DE ERROR
        ocupacion: this.formParticipante.value.ocupacion,
      }
      //VALIDACION DE FECHA NULLA

      if (this.dataParticipante === null) {
        //si es null entonces crear

        this.datoParticipante$ = this.participanteService.crearAsignarParticipante(modelo);
        this.datoParticipante$.subscribe({
          next: (data) => {
            this.mostrarAlerta('Participante creado correctamente', 'Listo');
            this.dialogReferencia.close("Creado");
          }, error: (e) => {
            this.mostrarAlerta('No se pudo crear', 'Error');
          }
        });
        console.log('MODEL CREAR', modelo);
      } else {
        this.mostrarAlerta('No se puede editar desde aqui', 'Error');

      }

    }
  }
}
