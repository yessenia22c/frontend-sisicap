import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ActualizarContactoSeguimiento, AllContactosSeguimiento, AllEstado, AllTipoSeguimiento, ContactosSeguimiento, Estado, GetSeguimiento, GrupoSeguimiento, SexoContacto, TipoSeguimiento, UnGrupoSeguimiento, UnSeguimiento } from 'src/app/models/seguimiento';
import { ChangeDetectorRef } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

//MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginatorService } from 'src/app/services/Paginator.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSortModule} from '@angular/material/sort';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatDatepickerBase, NgxMatDateAdapter, NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DatePipe } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

import {MatFormFieldModule} from '@angular/material/form-field';

import { FormBuilder,ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import * as moment from 'moment';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AllCiudades, AllPaises, AllSexos, Ciudad, Pais, Sexo } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AllCambio, CambiosRegistrado, InformacionContacto, SeguimientoContacto } from 'src/app/models/contacto';

import { MatDatepicker } from '@angular/material/datepicker';
import { ServicioActualizarCrearContactoSeguimientoService } from 'src/app/services/servicioActualizarCrearContactoSeguimiento.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { FormContactoSeguimientoComponent } from "../form-contacto-seguimiento/form-contacto-seguimiento.component";
import { FormGrupoSeguimientoComponent } from '../form-grupo-seguimiento/form-grupo-seguimiento.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminarSeguimientoComponent } from '../dialog-eliminar-seguimiento/dialog-eliminar-seguimiento.component';
import { DialogEliminarContactoSeguimientoComponent } from '../dialog-eliminar-contacto-seguimiento/dialog-eliminar-contacto-seguimiento.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Directivas 

import { ControlRolesDirective } from 'src/app/directivas/control-roles.directive';
import { ExportarExcelService } from 'src/app/services/ExportarExcel.service';
import { MostrarColumnDirective } from 'src/app/directivas/mostrar-column.directive';
export const MY_DATE_FORMATS: NgxMatDateFormats  = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}
@Component({
    selector: 'app-grupo-seguimiento',
    standalone: true,
    templateUrl: './grupo-seguimiento.component.html',
    styleUrls: ['./grupo-seguimiento.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsado', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsado', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [
        // ...
        ExportarExcelService,
        DatePipe,
        { provide: MatPaginatorIntl, useClass: PaginatorService },
        { provide: MAT_DATE_LOCALE, useValue: 'es-BO' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: true } // Usar UTC para evitar problemas de zona horaria
        },
        {
            provide: MAT_MOMENT_DATE_FORMATS,
            useValue: { parse: 'YYYY-MM-DDTHH:mm:ssZ', display: 'MM/DD/YYYY' } // Formato deseado
        }
    ],
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMatDatetimePickerModule,
        MatDialogModule,
        NgxMatNativeDateModule, FormContactoSeguimientoComponent, MatProgressSpinnerModule,
        ControlRolesDirective,
        MostrarColumnDirective
      ],
      
})

export default class GrupoSeguimientoComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = [
    'accion',
    'id_contacto',
    'nombre_apellidos',
    'numero_contacto',
    'correo_contacto',
    'fecha_actualizacion',
    'prox_llamada',
    'observacion_llamada',
    'id_tipo_seguimiento',
    'nombre_empresa',
    'profesion',
    'intereses',
    'observaciones',
    'id_sexo',
    'id_ciudad',
    'id_pais',
    'id_estado_contacto',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  
  @ViewChild('snav') sidenav!: MatSidenav;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: AllContactosSeguimiento | null;
  listContactos$: Observable<ContactosSeguimiento> | undefined;
  dataSource = new MatTableDataSource<InformacionContacto>();
  @ViewChild(MatTable) table!: MatTable<AllContactosSeguimiento>;
  listaCambios$: Observable<AllCambio> | undefined;
  // dataSource = new MatTableDataSource<any>([], {
  //   data: (data: any) => data.id_historico // Debe ser una propiedad única en tus datos
  // });
  numAcceso: number = 20;
  resultsLength = 0;
  isLoadingResults = true;
  ContactoSeguimiento$: Observable<SeguimientoContacto> | undefined;

  private modeloSubject = new BehaviorSubject<InformacionContacto | null>(null);
  Datomodelo$ = this.modeloSubject.asObservable();

  listaPais$: Observable<Pais> | undefined;
  listaCiudad$: Observable<Ciudad> | undefined;
  listaSexo$: Observable<Sexo> | undefined;
  listaEstado$: Observable<AllEstado> | undefined;
  listaTipoSeguimiento$: Observable<AllTipoSeguimiento> | undefined;
  disabledInput: boolean = true;
  filterValue = '';
  showFiller = false;
  formContacto: FormGroup;

  id_tipo_seguimiento: number | null  = null;

  excelReporte$: Observable<any> | undefined;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private seguimientoService: SeguimientoService,
    private _liveAnnouncer: LiveAnnouncer,
    private personaService: PersonaService,
    private exportarExcelService: ExportarExcelService,
    private datePipe: DatePipe,
    private servicioContactoSeguimiento: ServicioActualizarCrearContactoSeguimientoService,
    public sidenavService: SidenavService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
  capacitacion$: Observable<UnGrupoSeguimiento>  |  undefined;
  UnSeguimiento$: Observable<UnSeguimiento> | undefined;
  dataParticipante$: Observable<AllContactosSeguimiento> | undefined;


  colorMap: Record<number, string> = {
    1: 'yellow',
    2: 'red',
    3: 'blue',
    4: 'green',
    // Agrega más entradas según tus necesidades
  };

  selectedTipoSeguimiento: number | null = null; // Inicializar como nulo o un valor por defecto si es necesario
   
// Función para manejar el cambio de selección
  onTipoSeguimientoChange(event: any) {
    this.selectedTipoSeguimiento = Number((event.target as HTMLSelectElement).value);
  }
  
  ngOnInit() {
    this.verSeguimiento();
    this.mostrarContactos();
    //this.seguimientoService.obtenerActualizacionesContactos().subscribe();
    this.seguimientoService.obtenerActualizacionesContactos().subscribe(update => {
      if (update) {
        // Update the specific item in your array based on the id
        const index = this.dataSource.data.findIndex(item => {
          console.log('ITEM IGUAL', item.id_historico === update.id);
          return item.id_historico === update.id; 
        });

        console.log("id_contacto update", update.id)
        console.log('INDEX', index);
        if (index !== -1) {
          // Update the specific field
          this.dataSource.data[index] = { ...this.dataSource.data[index], ...update.contactoSeguimiento };
          console.log('DATOS DATA SOURCE', this.dataSource.data[index]);
          console.log('DATOS DATA SOURCE ACT', update.contactoSeguimiento );

          this.dataSource._updateChangeSubscription();

          // Actualizar los selected después de la actualización
          //quitar el elemento del seleccionado array
          
           // Detect changes
          // this.cdr.detectChanges();
          // this.table.renderRows();
        }
      }
  
    });
    
    //Cerrar el sidenav si se cambia de ruta
    this.router.events.subscribe(event => {
      // Verifica si el evento es un cambio de ruta
      if (event instanceof NavigationStart) {
        // Cierra el sidenav
        this.sidenavService.close();
      }
    });
    // this.router.events.subscribe(() => {
    //   if (this.sidenavService.isOpen.asObservable()) {
    //     this.sidenavService.close();
    //   }
    // });
    // this.formContacto.get('InformacionContacto.Contactos.numero_contacto')?.disable();

  }
  onAccesoDeterminado(tieneAcceso: boolean): void {
    console.log('ACCESO DETERMINADO', tieneAcceso);
    if (tieneAcceso) {
      this.displayedColumns = [...this.displayedColumns, 'botones']; // Forzar la detección de cambios
    }
  }
  exportarReporteExcelSeguimiento():void{
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];
    this.excelReporte$ = this.exportarExcelService.exportarReporteExcel(id_grupo_seguimiento);
    this.excelReporte$.subscribe({
      next: (data: Blob) => {
        const obtenerFechaActual = new Date();
            const dia = obtenerFechaActual.getDate();
            const mes = obtenerFechaActual.getMonth() + 1; // Nota: Los meses en JavaScript son indexados desde 0, por lo que sumamos 1.
            const anio = obtenerFechaActual.getFullYear();
            const fileName = `ReporteSeguimiento-${dia}-${mes}-${anio}.xlsx`;
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        
      },error: (err) => {
        
          console.log(err);
          this.mostrarAlerta('Error al exportar el reporte', 'Error');
        
      
      }
    });
  }
  abirSeccionContactos(): void {
    // ir a la ruta de contactos
    // limpiar la ruta actual para ir a otra

    this.router.navigate(['./../../../contactos'], { relativeTo: this.activatedRoute });
  }
  verSeguimiento() {
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];

    this.UnSeguimiento$ = this.seguimientoService.verGrupoSeguimiento(id_grupo_seguimiento);
    this.UnSeguimiento$.pipe(
      tap((data: UnSeguimiento) => {

        console.log('GRUPO SEGUMIENTO', data);
      }
      ), catchError((err) => {
        console.log('ERROR', err);
        return of([]);
      })
    ).subscribe();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  filterData() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  trackByFn(index: number, item: AllContactosSeguimiento): number {
    return item.Contactos.id_contacto;
  }
  
  mostrarContactos() {
    function setDefaultIfNull(obj: any, defaultValue: any): any {
      return obj !== null ? obj : defaultValue;
    }
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];

    this.listContactos$ =  this.seguimientoService.verContactosSeguimiento(id_grupo_seguimiento);
    this.listContactos$.subscribe({
      next: (data: ContactosSeguimiento) => {
        
        this.dataSource.data = data.AllContactosSeguimiento;

        this.isLoadingResults = false;
        //console.log(this.dataSource.data)
        this.servicioContactoSeguimiento.disparadorContactosAct.emit(this.dataSource.data);
        console.log('CONTACTOS DATA SOURCE ENVIADOS', this.servicioContactoSeguimiento.disparadorContactosAct.emit(this.dataSource.data));
        // this.dataSource.data = data.AllContactosSeguimiento.map(item => ({
        //   ...item,
        //   TipoSeguimiento: setDefaultIfNull(item.TipoSeguimiento, {
        //     id_tipo_seguimiento: null,
        //     nombre_tipo_seguimiento: null
        //   }),
        //   Contactos: {
        //     ...item.Contactos,
        //     Sexo_contacto: setDefaultIfNull(item.Contactos.Sexo_contacto, {
        //       id_sexo: null,
        //       nombre_sexo: null
        //     }),
        //     Ciudad_contacto: setDefaultIfNull(item.Contactos.Ciudad_contacto, {
        //       id_ciudad: null,
        //       nombre_ciudad: null
        //     }),
        //     Pais_contacto: setDefaultIfNull(item.Contactos.Pais_contacto, {
        //       id_pais: null,
        //       nombre_pais: null
        //     }),
        //     Estado: setDefaultIfNull(item.Contactos.Estado, {
        //       id_estado_contacto: null,
        //       nombre_estado: null
        //     })
        //   }
        // }));
        console.log('CONTACTOS DATA SOURCE', this.dataSource.data);
        this.dataSource.filterPredicate = (data: InformacionContacto, filter: string) => {
          const contactoDatas = data.Contactos;

          const values = Object.values(contactoDatas);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };
      }
    });

  }



  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }
  cerrarSidenav() {
    this.sidenav.close();
  }

  actualizarFila(index: number, newData: any) {
    // Actualizar los datos en tu origen de datos (dataSource.data)
    this.dataSource.data[index] = newData;

    // Luego, después de haber cargado tus datos en dataSource.data, configura la función de identificación única
    this.dataSource.data = newData;
    this.dataSource.sort = this.sort; // Si también estás utilizando matSort

    
    console.log('DATA NUEVA FILA ACT', newData, 'INDEX', index)
    // Volver a renderizar la tabla para reflejar los cambios
    //this.table.renderRows();
  }
  arrayListaTipoSeguimiento: TipoSeguimiento[] = [];
  arrayListaSexo: AllSexos[] = [];
  arrayListaPais: AllPaises[] = [];
  arrayListaCiudad: AllCiudades[] = [];
  arrayListaEstado: AllEstado[] = [];
  abrirSidenav(modelo: InformacionContacto): void {
    this.sidenavService.open();
    console.log('ENVIANDO?', this.servicioContactoSeguimiento.disparadorContactos.emit(modelo));
    this.servicioContactoSeguimiento.disparadorContactos.emit(modelo);
    this.servicioContactoSeguimiento.disparadorContactosAct.emit(this.dataSource.data);
    // console.log('CONTACTOS DATA SOURCE ENVIADOS DESDE ABIR', this.servicioContactoSeguimiento.disparadorContactosAct.emit(this.dataSource.data));

  }
  // abrirSidenav(modelo: InformacionContacto): void {
  //   this.sidenav.open();
  //   console.log('MODELO', modelo);
  //   this.disabledInput = !this.disabledInput;

    
  //   this.listaPais$ = this.personaService.getListPais();
  //   this.listaCiudad$ = this.personaService.getListCiudad();
  //   this.listaSexo$ = this.personaService.getListSexo();
  //   this.listaEstado$ = this.seguimientoService.verEstadosSeguimiento();
  //   this.listaTipoSeguimiento$ = this.seguimientoService.verTipoSeguimiento();

  //   this.id_tipo_seguimiento = modelo.TipoSeguimiento!.id_tipo_seguimiento;

  //   const datos = this.formContacto.patchValue({
  //     InformacionContacto: {
  //       id_historico: modelo.id_historico,
  //       id_grupo_seguimiento: modelo.id_grupo_seguimiento,
  //       prox_llamada:  modelo?.prox_llamada,
  //       observacion_llamada: modelo?.observacion_llamada,
  //       Contactos: {
  //         id_contacto:  modelo.Contactos.id_contacto,
  //         nombre_apellidos:   modelo.Contactos.nombre_apellidos,
  //         numero_contacto:  modelo.Contactos.numero_contacto,
  //         correo_contacto:  modelo.Contactos.correo_contacto,
  //         nombre_empresa:   modelo.Contactos.nombre_empresa,
  //         profesion:  modelo.Contactos.profesion,
  //         intereses:  modelo.Contactos.intereses,
  //         observaciones:  modelo.Contactos.observaciones,
  //         Sexo_contacto: {
  //           id_sexo:  modelo.Contactos.Sexo_contacto?.id_sexo
  //         },
  //         Ciudad_contacto: {
  //           id_ciudad:  modelo.Contactos.Ciudad_contacto?.id_ciudad
  //         },
  //         Pais_contacto: {
  //           id_pais:  modelo.Contactos.Pais_contacto?.id_pais
  //         },
  //         Estado: {
  //           id_estado_contacto:   modelo.Contactos.Estado?.id_estado_contacto
  //         }

  //       },
  //       TipoSeguimiento: {
  //         id_tipo_seguimiento:  modelo.TipoSeguimiento?.id_tipo_seguimiento,
  //       }
  //     }


  //   });

  //   this.modeloSubject.next(modelo);



  // }
  fechaActualEnBolivia = new Date().toLocaleString('en-US', { timeZone: 'America/La_Paz' });
  fechaActual = new Date().toISOString().substring(0, 10); //YYYY-MM-DD
  // getTipoSeguimientoNombre(idTipoSeguimiento: number): string {
  //   const tipoSeguimientoNombres: { [id: number]: string } = {
  //     1: "Abierto",
  //     2: "Rechazado",
  //     3: "Registrado",
  //     4: "Pagado",
  //   };
  //   return tipoSeguimientoNombres[idTipoSeguimiento] || "";
  // }
  // getGenero(idGenero: number): string {
  //   const tipoSexo: { [id: number]: string } = {
  //     1: "FEMENINO",
  //     2: "MASCULINO",
  //   };
  //   return tipoSexo[idGenero] || "";
  // }
  // getEstado(idEstado: number): string {
  //   const tipoEstado: { [id: number]: string } = {
  //     1: "CLIENTE",
  //     2: "POSIBLE CLIENTE",
  //     3: "BLOQUEADO"
  //   };
  //   return tipoEstado[idEstado] || "";
  // }
  // getCiudad(idCiudad: number): string {
  //   const listaCiudad: { [id: number]: string } = {
  //     1: "SANTA CRUZ",
  //     2: "BENI",
  //     3: "PANDO",
  //     4: "TARIJA",
  //     5: "CHUQUISACA",
  //     6: "COCHABAMBA",
  //     7: "ORURO",
  //     8: "POTOSÍ",
  //     9: "LA PAZ"
  //   };
  //   return listaCiudad[idCiudad] || "";
  // }
  // getPais(idPais: number): string {
  //   const listPaises: { [id: number]: string } = {
  //     1: "BOLIVIA",
  //     2: "OTRO PAÍS"
  //   };
  //   return listPaises[idPais] || "";
  // }

  // EditarContactoSeguimiento(): void {
  //   console.log('FORMULARIO SEG CONTAC', this.formContacto.value);
  //   //funcion que ayuda a establecer los valores en null si no se ha seleccionado nada en el select
  //   function setDefaultIfNull(obj: any, defaultValue: any): any {
  //     return obj !== null ? obj : defaultValue;
  //   }
  //   console.log(this.formContacto.get('InformacionContacto.Contactos.numero_contacto')?.value, 'NUMERO CONTACTO')
  //   const modelo: SeguimientoContacto = {
  //     InformacionContacto: {
  //       id_historico: 0,
  //       id_grupo_seguimiento: 0,
  //       fecha_actualizacion: this.fechaActualEnBolivia,
  //       prox_llamada: this.formContacto.value.InformacionContacto.prox_llamada,
  //       observacion_llamada: this.formContacto.value.InformacionContacto.observacion_llamada,
  //       Contactos: {
  //         id_contacto: 0,
  //         nombre_apellidos: this.formContacto.value.InformacionContacto.Contactos.nombre_apellidos,
  //         numero_contacto: this.formContacto.get('InformacionContacto.Contactos.numero_contacto')?.value,
  //         correo_contacto: this.formContacto.value.InformacionContacto.Contactos.correo_contacto,
  //         nombre_empresa: this.formContacto.value.InformacionContacto.Contactos.nombre_empresa,
  //         profesion: this.formContacto.value.InformacionContacto.Contactos.profesion,
  //         intereses: this.formContacto.value.InformacionContacto.Contactos.intereses,
  //         observaciones: this.formContacto.value.InformacionContacto.Contactos.observaciones,
  //         Sexo_contacto: {
  //           id_sexo: this.formContacto.value.InformacionContacto.Contactos.Sexo_contacto.id_sexo
  //         },
  //         Ciudad_contacto: {
  //           id_ciudad: this.formContacto.value.InformacionContacto.Contactos.Ciudad_contacto.id_ciudad
  //         },
  //         Pais_contacto: {
  //           id_pais: this.formContacto.value.InformacionContacto.Contactos.Pais_contacto.id_pais
  //         },
  //         Estado: {
  //           id_estado_contacto: this.formContacto.value.InformacionContacto.Contactos.Estado.id_estado_contacto
  //         }
  //       },
  //       TipoSeguimiento: {
  //         id_tipo_seguimiento: this.formContacto.value.InformacionContacto.TipoSeguimiento.id_tipo_seguimiento,
  //       }
  //     }

  //   };

  //   // Supongamos que tienes el ID único del contacto que estás actualizando

  //   if (this.formContacto.dirty == null) {
  //     //Crear nuevo contacto
  //   } else {
  //     const fechaProxLlamada = this.formContacto.get('InformacionContacto.prox_llamada')?.value;
  //     if (fechaProxLlamada === null || fechaProxLlamada === '') {
  //       modelo.InformacionContacto.prox_llamada = null; // Establecer el valor en null
  //     }
  //     //PARA VERIFICAR CUANDO CAMBIA EL TIPO DE SEGUIMIENTO
  //     if (modelo.InformacionContacto.TipoSeguimiento?.id_tipo_seguimiento != this.id_tipo_seguimiento) {
  //       const nuevoTipoSeguimiento = this.formContacto.value.InformacionContacto.TipoSeguimiento.id_tipo_seguimiento;
  //       console.log('TIPO SEGUIMIENTO ANTES ', this.id_tipo_seguimiento, 'AHORA ', nuevoTipoSeguimiento);
  //     }
  //     //console.log('TIPO SEGUIMIENTO CAMBIO', this.id_tipo_seguimiento);
  //     modelo.InformacionContacto.id_historico = this.formContacto.value.InformacionContacto.id_historico;
  //     modelo.InformacionContacto.id_grupo_seguimiento = this.formContacto.value.InformacionContacto.id_grupo_seguimiento;
  //     modelo.InformacionContacto.Contactos.id_contacto = this.formContacto.value.InformacionContacto.Contactos.id_contacto;
  //     this.ContactoSeguimiento$ = this.seguimientoService.actualizarContactoSeguimiento(modelo);
  //     this.ContactoSeguimiento$.subscribe({
  //       next: (dato) => {
  //         //this.actualizarFila(modelo.InformacionContacto.Contactos.id_contacto, modelo.InformacionContacto);
          
  //         console.log('CONTACTO ACTUALIZADO', dato);
  //         this.mostrarAlerta('Datos registrados correctamente', 'Listo');
  //         //this.mostrarContactos();
  //         const datoExistente = this.dataSource.data.find((item) => item.id_historico === modelo.InformacionContacto.id_historico);
  //         if(datoExistente){
  //           datoExistente.fecha_actualizacion = modelo.InformacionContacto.fecha_actualizacion;
  //           datoExistente.prox_llamada = modelo.InformacionContacto.prox_llamada;
  //           datoExistente.observacion_llamada = modelo.InformacionContacto.observacion_llamada;
  //           datoExistente.Contactos.nombre_apellidos = modelo.InformacionContacto.Contactos.nombre_apellidos;
  //           datoExistente.Contactos.numero_contacto = modelo.InformacionContacto.Contactos.numero_contacto;
  //           datoExistente.Contactos.correo_contacto = modelo.InformacionContacto.Contactos?.correo_contacto!;
  //           datoExistente.Contactos.nombre_empresa = modelo.InformacionContacto.Contactos.nombre_empresa;
  //           datoExistente.Contactos.profesion = modelo.InformacionContacto.Contactos.profesion;
  //           datoExistente.Contactos.intereses = modelo.InformacionContacto.Contactos.intereses;
  //           datoExistente.Contactos.observaciones = modelo.InformacionContacto.Contactos.observaciones;
  //           datoExistente.Contactos.Sexo_contacto.id_sexo = modelo.InformacionContacto.Contactos.Sexo_contacto?.id_sexo!;
  //           datoExistente.Contactos.Ciudad_contacto.id_ciudad = modelo.InformacionContacto.Contactos.Ciudad_contacto?.id_ciudad!;
  //           datoExistente.Contactos.Pais_contacto.id_pais = modelo.InformacionContacto.Contactos.Pais_contacto?.id_pais!;
  //           datoExistente.Contactos.Estado.id_estado_contacto = modelo.InformacionContacto.Contactos.Estado?.id_estado_contacto!;
  //           datoExistente.TipoSeguimiento.id_tipo_seguimiento = modelo.InformacionContacto.TipoSeguimiento?.id_tipo_seguimiento!;
            
  //         }else{
  //           console.log('Fallo en el intento');
  //         }
  //         this.dataSource._renderChangesSubscription;
  //         //this.table.renderRows();
  //         this.cerrarSidenav();

  //       },
  //       error: (err) => {
  //         console.log('ERROR', err);
  //         this.mostrarAlerta('Error al registrar los datos', 'Error');
  //       }
  //     });

  //     console.log('DATO A ACTUALIZAR', modelo);

  //   }


  // }
  arrayListaCambios: CambiosRegistrado[] = [];
  verCambios(id_historico: number): void {
    this.listaCambios$ = this.seguimientoService.verCambios(id_historico);
    this.listaCambios$.subscribe((data: AllCambio) => {
      this.arrayListaCambios = data.CambiosRegistrados;
    });
    console.log('MIRANDO CAMBIOS')
  }

  editarSeguimiento(dataCapacitacion: GetSeguimiento) {  
    console.log('DATO SEGUIMIENTO', dataCapacitacion);
    this.dialog.open(FormGrupoSeguimientoComponent,{
      disableClose: true,
      width: '400px',
      data: dataCapacitacion
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.verSeguimiento();
      }
    })
    
  }
  eliminarSeguimiento( dataParticipante: GetSeguimiento){
    this.dialog.open(DialogEliminarSeguimientoComponent,{
      disableClose: true,
      data:  dataParticipante
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.seguimientoService.eliminarSeguimiento(dataParticipante.UnGrupoSeguimiento.id_grupo_seguimiento).subscribe({
          next: (resp) => { 
            console.log('RESP',resp);
            this.mostrarAlerta('Seguimiento eliminado correctamente', 'Listo');
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          },
          error: (err) => {
            this.mostrarAlerta('Error al eliminar el seguimiento', 'Error');
            console.log(err);
          }
        });
      }
    });
  }

  eliminarContactoSegumiento( dataContacto: InformacionContacto){
    this.dialog.open(DialogEliminarContactoSeguimientoComponent,{
      disableClose: true,
      data:  dataContacto
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.seguimientoService.eliminarContactoSeguimiento(dataContacto.id_historico).subscribe({
          next: (resp) => { 
            console.log('RESP',resp);
            this.mostrarAlerta('Contacto eliminado del seguimiento correctamente', 'Listo');
            //Actualizar lista contacto pero sin el contacto eliminado
            this.seguimientoService.obtenerActualizacionesContactos().subscribe(objetoEliminar => {
              if (objetoEliminar) {
                const indexEliminar = this.dataSource.data.findIndex(item => {
                  return item.id_historico === objetoEliminar.id; 
                });
        
                if (indexEliminar !== -1) {
                  this.dataSource.data.splice(indexEliminar, 1);
        
                  this.dataSource._updateChangeSubscription();
                }
              }
          
            });
          },
          error: (err) => {
            this.mostrarAlerta('Este contacto no se puede eliminiar', 'Error');
            console.log(err);
          }
        });
      }
    });
  }
  // dialogoEliminarParticipante(dataParticipante: NuevoParticipante) {

  //   this.dialog.open(DialogoDeleteComponent,{
      
  //     disableClose: true,
  //     data:  dataParticipante
  //   }).afterClosed().subscribe(resultado => {
  //     if(resultado==="eliminar"){
  //       this.participanteService.eliminarParticipante(dataParticipante.id_participante).subscribe({
  //         next: (resp) => { 
  //           console.log('RESP',resp);
  //           this.mostrarAlerta('Participante eliminado correctamente', 'Listo');
            
  //           this.mostrarParticipantes();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       });
  //     }
  //   })
  // }
}

