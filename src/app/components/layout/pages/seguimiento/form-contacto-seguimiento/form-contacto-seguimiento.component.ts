import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllCiudades, AllPaises, AllSexos, Ciudad, Pais, Sexo } from 'src/app/models/persona';
import { AllContactosSeguimiento, AllEstado, AllTipoSeguimiento } from 'src/app/models/seguimiento';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { PersonaService } from 'src/app/services/persona.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatDatetimePickerModule, NgxMatDatepickerBase, NgxMatDateAdapter, NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import {Validators, FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { Cambio, InformacionContacto, SeguimientoContacto } from 'src/app/models/contacto';
import { ServicioActualizarCrearContactoSeguimientoService } from 'src/app/services/servicioActualizarCrearContactoSeguimiento.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
// import * as moment from 'moment-timezone';


@Component({
  selector: 'app-form-contacto-seguimiento',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule ,
    MatCardModule,
    ReactiveFormsModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatListModule
  ],
  templateUrl: './form-contacto-seguimiento.component.html',
  styleUrls: ['./form-contacto-seguimiento.component.css']
})
export class FormContactoSeguimientoComponent implements OnInit {
  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;
  listaEstado$: Observable<AllEstado> | undefined;
  listaTipoSeguimiento$: Observable<AllTipoSeguimiento> | undefined;
  formContacto: FormGroup;
  observacionLlamada: number | null  = null;
  ContactoSeguimiento$: Observable<SeguimientoContacto> | undefined;
  registrarCambios$ : Observable<Cambio> | undefined;
  dataSourceSide: Array<AllContactosSeguimiento> = [];
  // @ViewChild('miFormSide') sidenav!: MatSidenav;
  private dataSubject = new BehaviorSubject<InformacionContacto | null>(null);
  Datomodelo$ = this.dataSubject.asObservable();
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private seguimientoService: SeguimientoService,
    private personaService: PersonaService,
    private servicioContactoSeguimiento: ServicioActualizarCrearContactoSeguimientoService,
    public sidenavService: SidenavService
  ) { 
    this.formContacto = this.fb.group({
      InformacionContacto: this.fb.group({
        id_historico: [''],
        id_grupo_seguimiento: [''],
        prox_llamada: [''],
        observacion_llamada: [''],
        Contactos: this.fb.group({
          id_contacto: [''],
          nombre_apellidos: ['', Validators.required],
          numero_contacto: this.fb.control({disabled: true, value: '' }, Validators.required),
          correo_contacto: [''],
          nombre_empresa: [''],
          profesion: [''],
          intereses: [''],
          observaciones: [''],
          Sexo_contacto: this.fb.group({
            id_sexo: ['']
          }),
          Ciudad_contacto: this.fb.group({
            id_ciudad: ['']
          }),
          Pais_contacto: this.fb.group({
            id_pais: ['']
          }),
          Estado: this.fb.group({
            id_estado_contacto: ['']
          }),

        }),
        TipoSeguimiento: this.fb.group({
          id_tipo_seguimiento: ['']
        })
      })


   });
  }

  ngOnInit(): void {

    this.listaPais$ = this.personaService.getListPais();
    this.listaCiudad$ = this.personaService.getListCiudad();
    this.listaSexo$ = this.personaService.getListSexo();
    this.listaEstado$ = this.seguimientoService.verEstadosSeguimiento();
    this.listaTipoSeguimiento$ = this.seguimientoService.verTipoSeguimiento();
    
    this.servicioContactoSeguimiento.disparadorContactos.subscribe(data => {
      // this.sidenav.open();
      console.log("DATA QUE RECIBE CON EMIT", data);

      this.observacionLlamada = data.observacion_llamada!;

      const datos = this.formContacto.patchValue({
        InformacionContacto: {
          id_historico: data.id_historico,
          id_grupo_seguimiento: data.id_grupo_seguimiento,
          prox_llamada: data?.prox_llamada,
          observacion_llamada: data?.observacion_llamada,
          Contactos: {
            id_contacto: data.Contactos.id_contacto,
            nombre_apellidos: data.Contactos.nombre_apellidos,
            numero_contacto: data.Contactos.numero_contacto,
            correo_contacto: data.Contactos.correo_contacto,
            nombre_empresa: data.Contactos.nombre_empresa,
            profesion: data.Contactos.profesion,
            intereses: data.Contactos.intereses,
            observaciones: data.Contactos.observaciones,
            Sexo_contacto: {
              id_sexo: data.Contactos.Sexo_contacto?.id_sexo
            },
            Ciudad_contacto: {
              id_ciudad: data.Contactos.Ciudad_contacto?.id_ciudad
            },
            Pais_contacto: {
              id_pais: data.Contactos.Pais_contacto?.id_pais
            },
            Estado: {
              id_estado_contacto: data.Contactos.Estado?.id_estado_contacto
            }

          },
          TipoSeguimiento: {
            id_tipo_seguimiento: data.TipoSeguimiento?.id_tipo_seguimiento,
          }
        }


      });

      this.dataSubject.next(data);
    });

    // this.servicioContactoSeguimiento.disparadorContactosAct.subscribe(data => {
    //   console.log('DATASOUSE desde Sidenav', data);
    // })

    this.servicioContactoSeguimiento.disparadorContactosAct.subscribe(data => {
      this.dataSourceSide = data;
      //console.log('DATASOUSE QUE LLGA', this.dataSourceSide);
    });

  }
  cerrarSidenav() {
    this.sidenavService.close();
  }
  colorMap: Record<number, string> = {
    1: 'yellow',
    2: 'red',
    3: 'blue',
    4: 'green',
    // Agrega más entradas según tus necesidades
  };
  //fechaActualEnBolivia = moment.tz(new Date(), 'America/La_Paz').format();
  fechaActualEnBolivia = new Date().toLocaleString('en-US', { timeZone: 'America/La_Paz' });
  fechaActual = new Date().toISOString().substring(0, 10); //YYYY-MM-DD

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }
  EditarContactoSeguimiento(): void {
    
    console.log('FORMULARIO SEG CONTAC', this.formContacto.value);
    //funcion que ayuda a establecer los valores en null si no se ha seleccionado nada en el select
    function setDefaultIfNull(obj: any, defaultValue: any): any {
      return obj !== null ? obj : defaultValue;
    }
    console.log(this.formContacto.get('InformacionContacto.Contactos.numero_contacto')?.value, 'NUMERO CONTACTO')
    const modelo: SeguimientoContacto = {
      InformacionContacto: {
        id_historico: 0,
        id_grupo_seguimiento: 0,
        fecha_actualizacion: this.fechaActualEnBolivia,
        prox_llamada: this.formContacto.value.InformacionContacto.prox_llamada,
        observacion_llamada: this.formContacto.value.InformacionContacto.observacion_llamada,
        Contactos: {
          id_contacto: 0,
          nombre_apellidos: this.formContacto.value.InformacionContacto.Contactos.nombre_apellidos,
          numero_contacto: this.formContacto.get('InformacionContacto.Contactos.numero_contacto')?.value,
          correo_contacto: this.formContacto.value.InformacionContacto.Contactos.correo_contacto,
          nombre_empresa: this.formContacto.value.InformacionContacto.Contactos.nombre_empresa,
          profesion: this.formContacto.value.InformacionContacto.Contactos.profesion,
          intereses: this.formContacto.value.InformacionContacto.Contactos.intereses,
          observaciones: this.formContacto.value.InformacionContacto.Contactos.observaciones,
          Sexo_contacto: {
            id_sexo: this.formContacto.value.InformacionContacto.Contactos.Sexo_contacto.id_sexo
          },
          Ciudad_contacto: {
            id_ciudad: this.formContacto.value.InformacionContacto.Contactos.Ciudad_contacto.id_ciudad
          },
          Pais_contacto: {
            id_pais: this.formContacto.value.InformacionContacto.Contactos.Pais_contacto.id_pais
          },
          Estado: {
            id_estado_contacto: this.formContacto.value.InformacionContacto.Contactos.Estado.id_estado_contacto
          }
        },
        TipoSeguimiento: {
          id_tipo_seguimiento: this.formContacto.value.InformacionContacto.TipoSeguimiento.id_tipo_seguimiento,
        },
        
      },
      informacionActualizadoContacto: null

    };

    // Supongamos que tienes el ID único del contacto que estás actualizando

    if (this.formContacto.dirty == null) {
      //Crear nuevo contacto
    } else {
      const fechaProxLlamada = this.formContacto.get('InformacionContacto.prox_llamada')?.value;

      if (fechaProxLlamada === null || fechaProxLlamada === '') {
        modelo.InformacionContacto.prox_llamada = null; // Establecer el valor en null
      }
      //PARA VERIFICAR CUANDO CAMBIA la observacion llamada
      if (modelo.InformacionContacto.observacion_llamada != this.observacionLlamada) {
        //REGISTRA CAMBIOS EN EL SEGUMIENTO DE CONTACTO
        const fechaParseada = moment(this.fechaActualEnBolivia, 'M/D/YYYY, h:mm:ss A');

        // Formatea la fecha en el nuevo formato "YYYY-MM-DD HH:mm:ss"
        const fechaFormateada = fechaParseada.format('YYYY-MM-DD HH:mm:ss');
        const datosCambios: Cambio = {
          id_historico: this.formContacto.value.InformacionContacto.id_historico,
          observacion_llamada: modelo.InformacionContacto.observacion_llamada!,
          fecha_seguimiento: this.fechaActualEnBolivia,
        }
        console.log('EL CAMBIO OBSE',datosCambios);
        // this.registrarCambios$ = this.seguimientoService.registrarCambios(datosCambios);
        // this.registrarCambios$.subscribe(
        //   {
        //     next: (dato) => {
        //       console.log('DATOS CAMBIOS REGISTRADOS', dato);
        //     }
        //   });
        // const nuevaObservacion = this.formContacto.value.InformacionContacto.observacion_llamada;
        // console.log('Observacion ANTES ', this.observacionLlamada, 'AHORA ', nuevaObservacion);
      }
      //console.log('TIPO SEGUIMIENTO CAMBIO', this.id_tipo_seguimiento);
      modelo.InformacionContacto.id_historico = this.formContacto.value.InformacionContacto.id_historico;
      modelo.InformacionContacto.id_grupo_seguimiento = this.formContacto.value.InformacionContacto.id_grupo_seguimiento;
      modelo.InformacionContacto.Contactos.id_contacto = this.formContacto.value.InformacionContacto.Contactos.id_contacto;
      this.ContactoSeguimiento$ = this.seguimientoService.actualizarContactoSeguimiento(modelo);
      this.ContactoSeguimiento$.subscribe({
        next: (dato) => {
          //this.actualizarFila(modelo.InformacionContacto.Contactos.id_contacto, modelo.InformacionContacto);
          
          console.log('CONTACTO ACTUALIZADO', dato);
          this.mostrarAlerta('Datos registrados correctamente', 'Listo');
          this.seguimientoService.actualizarContacto(dato.informacionActualizadoContacto);
          //this.mostrarContactos();
          // console.log('DATASOURCE DE SIDENAV', this.servicioContactoSeguimiento.disparadorContactosAct.subscribe(data => {console.log('DATASOUSE desde Sidenav', data);}))
          // const datoExistente = this.dataSourceSide.find((item: any) => item.id_historico === modelo.InformacionContacto.id_historico);
          //   if (datoExistente) {
          //     console.log('Lo encontro')
          //     datoExistente.fecha_actualizacion = modelo.InformacionContacto.fecha_actualizacion;
          //     datoExistente.prox_llamada = modelo.InformacionContacto.prox_llamada;
          //     datoExistente.observacion_llamada = modelo.InformacionContacto.observacion_llamada;
          //     datoExistente.Contactos.nombre_apellidos = modelo.InformacionContacto.Contactos.nombre_apellidos;
          //     datoExistente.Contactos.numero_contacto = modelo.InformacionContacto.Contactos.numero_contacto;
          //     datoExistente.Contactos.correo_contacto = modelo.InformacionContacto.Contactos?.correo_contacto!;
          //     datoExistente.Contactos.nombre_empresa = modelo.InformacionContacto.Contactos.nombre_empresa;
          //     datoExistente.Contactos.profesion = modelo.InformacionContacto.Contactos.profesion;
          //     datoExistente.Contactos.intereses = modelo.InformacionContacto.Contactos.intereses;
          //     datoExistente.Contactos.observaciones = modelo.InformacionContacto.Contactos.observaciones;
          //     datoExistente.Contactos.Sexo_contacto.id_sexo = modelo.InformacionContacto.Contactos.Sexo_contacto?.id_sexo!;
          //     datoExistente.Contactos.Ciudad_contacto.id_ciudad = modelo.InformacionContacto.Contactos.Ciudad_contacto?.id_ciudad!;
          //     datoExistente.Contactos.Pais_contacto.id_pais = modelo.InformacionContacto.Contactos.Pais_contacto?.id_pais!;
          //     datoExistente.Contactos.Estado.id_estado_contacto = modelo.InformacionContacto.Contactos.Estado?.id_estado_contacto!;
          //     datoExistente.TipoSeguimiento.id_tipo_seguimiento = modelo.InformacionContacto.TipoSeguimiento?.id_tipo_seguimiento!;

          //   } else {
          //     console.log('Fallo en el intento');
          //   }
          
          //this.dataSource._renderChangesSubscription;
          //this.table.renderRows();
          this.cerrarSidenav();

        },
        error: (err) => {
          console.log('ERROR', err);
          this.mostrarAlerta('Error al registrar los datos', 'Error');
        }
      });

      console.log('DATO A ACTUALIZAR DESDE SIDENAV', modelo);

    }


  }

}
