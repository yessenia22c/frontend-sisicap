import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


//Prueba con NG-SELECT
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import {catchError, delay, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
//iMPORTACIONES PARA INSCRIPCIONES
import { ElementRef, ViewChild, inject} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable, of, concat, Subject, BehaviorSubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Inscripciones, ListaInscripcion, Participante, ParticipantesNoInscritos } from 'src/app/models/capacitacion';
import { ActivatedRoute } from '@angular/router';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { MatInputModule } from '@angular/material/input';
//para seleccionar
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-inscribir-participante',
  standalone: true,
  imports: [CommonModule,NgSelectModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule,
     MatAutocompleteModule, FormsModule, MatInputModule],
  templateUrl: './dialog-inscribir-participante.component.html',
  styleUrls: ['./dialog-inscribir-participante.component.css']
})
export class DialogInscribirParticipanteComponent implements OnInit {


  formcontrol = new FormControl('');
  
  filteroptionslist!: Observable<Participante[]>;
  participantesSeleccionados: string[] = [];

  @ViewChild('inscripcionInput') inscripcionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('tarjetasContenedor') tarjetasContenedor!: ElementRef<HTMLElement>;
  announcer = inject(LiveAnnouncer);
  id_cap!: number;
  
  
  
  
  filtroOpciones!: Participante[];

  activatedRoute = inject(ActivatedRoute);
  capacitacionService = inject(CapacitacionService);
  participantesLista!: Participante[] ;
  
  listaParticipantes$!: Observable<ParticipantesNoInscritos>;


  seleccion = new SelectionModel<any>(true, []);
  constructor(
    private _snackBar: MatSnackBar,
    private config: NgSelectConfig,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogReferencia: MatDialogRef<DialogInscribirParticipanteComponent>
  ) {
    this.config.notFoundText = 'No se encontraron resultados';
    this.config.appendTo = 'body';
    

    
  }

  seleccionado : Participante[] = [] ;
  opciones: any[] = [];
  datosCargados =  false;
  peopleInput$ = new BehaviorSubject<string>(''); // ANtes era un Subject
  mostrarDesplegable = false;
  opcionesSeleccionadas!: ListaInscripcion;
  people$!: Observable<Participante[]>;
  listaInscritos$: Observable<ListaInscripcion> | undefined;
  habilitarBoton = true;
  
  ngOnInit(): void {
    this.id_cap = this.data.id_capacitacion;
    


    this.filtrarParticipantesNoInscritos();
    //this.mostrarParticipantesNoInscritos();
    this.loadPeople();
    //console.log('ESTO TIENE GET PEOPLE',this.loadPeople());
    


    this.actualizarOpcionesSeleccionadas
    
  }

  // tarjetasPosicioandas():void {
  //   this.config.appendTo = this.tarjetasContenedor.nativeElement;
  // }

  mostrarParticipantesNoInscritos(){
    this.id_cap = this.data.id_capacitacion;
    const id_capacitacion = this.id_cap;
    //console.log('ID CAPACITACION NO INSCRITOs',id_capacitacion);
    this.listaParticipantes$ = this.capacitacionService.getParticipantesNoInscrtios(id_capacitacion);
    //  this.listaParticipantes$.subscribe({
    //    next: (resp: ParticipantesNoInscritos) => {
    //       console.log('NO INSCRITOS',resp);
    //       this.participantesLista = resp.participantes;
    //       console.log('participantes asig',this.participantesLista )
    //    }
    //  });
  }

  //AQUI ME QUEDE TENGO QUE ENCONTAR LA FORMA DEAGREGAR AL ARRAY LAS OPCIONES SELECCIONADAS
  actualizarOpcionesSeleccionadas(event: any) {

    this.seleccionado = event;
    this.mostrarParticipantesNoInscritos();
    this.id_cap = parseInt(this.data.id_capacitacion);
    const idCapacitacion: number = this.id_cap;
   
    const inscripciones: Inscripciones[] = this.seleccionado.map(item => ({
      id_capacitacion: idCapacitacion , // el id capacitacion que esta en la ruta
      id_participante: item.id_participante
    }));
  
    const nuevaListaInscripcion: ListaInscripcion = {
      inscripciones: inscripciones
    };

    this.opcionesSeleccionadas= nuevaListaInscripcion;
    if (this.opcionesSeleccionadas.inscripciones.length > 0) {
      this.habilitarBoton = false;
      console.log('Nuevo valor de boton', this.habilitarBoton);
    }else{
      this.habilitarBoton = true;
      console.log('Nuevo valor de boton', this.habilitarBoton);
    }
    //this.opcionesSeleccionadas = [nuevaListaInscripcion];
    //this.opcionesSeleccionadas.push(nuevaListaInscripcion.inscripciones[0]);
     console.log('ESTO TIENE OPCIONES SELECCIONADAS',this.opcionesSeleccionadas);
    // console.log('TYPO DE DATO ID_CAPACITACION', typeof(idCapacitacion));
    // console.log('seleccionados', this.seleccionado);
    
  }
  
  
  termInput: any; // Inicializar term en null

  actualizarTerm(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.termInput = (inputElement?.value?.trim() ?? '') !== '' ? inputElement?.value : null; // Actualizar term según el valor de la entrada de texto
    console.log('Valor del ng-select:', this.termInput);
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
  }
  agregarInscritos(modelo: ListaInscripcion){
    if (this.habilitarBoton = true){
      this.habilitarBoton = true;
      this.listaInscritos$ = this.capacitacionService.agregarInscritosCapacitacion(modelo);
      this.listaInscritos$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Participantes inscritos correctamente', 'Listo');
        this.dialogReferencia.close("Creado");
        console.log('ESTO TIENE LA DATA',data);
      }, error: (e) => {
        this.mostrarAlerta('No se pudo inscribir', 'Error');
        
      }
    });
    }
    

  }
  
  getPeople(term: string ): Observable<Participante[]> {
    console.log('ESTO TIENE EL TERM',term); 

    
    this.mostrarDesplegable = !!term; // Mostrar el desplegable solo si hay un término de búsqueda
    this.mostrarParticipantesNoInscritos();
    if (term && term.trim() !== '') {
      return this.listaParticipantes$.pipe(
        map((resp: ParticipantesNoInscritos) => {
          const participantes = resp.participantes.map(participante => ({
            ...participante,
            nombreCompleto: `${participante.Personas.nombres_per} ${participante.Personas.apellidos}`
          }));
          return participantes.filter(x =>
            x.nombreCompleto.toLowerCase().includes(term.toLowerCase())
          );
        }),
        delay(500)
        
      );
      
    } else {
      term = '';
      return this.listaParticipantes$.pipe(
        map((resp: ParticipantesNoInscritos) => resp.participantes),
        delay(500)
      );
    }
  }
  
  
  trackByFn(item: Participante) {
    return item.id_participante;
  }
  //Pruebas buscadores no implrmentados
  private loadPeople(): void {
    
    this.people$ = concat(
      of([]), // default items
      this.peopleInput$.pipe(
        
        //filter(term => !!term), // if truthy (not null nor undefined
        distinctUntilChanged(),
        tap(() => (this.datosCargados = true)),
        switchMap(term => this.getPeople(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => {
            this.datosCargados = false;
            
            console.log('get value peopleiNPUT',this.peopleInput$.getValue());
            //this.peopleInput$.next('');  // ME quedo aqui Hay que limpiar el valor del input
            //console.log('NUevo valor del peopleInput',this.peopleInput$.getValue());
          })
        )),
      )
    )
    console.log('ESTO TIENE peopleInput',this.peopleInput$);
    // this.people$ = this.formcontrol.valueChanges.pipe(
    //   distinctUntilChanged(),
    //   tap(() => this.datosCargados = true),
    //   switchMap(term => {
    //     this.datosCargados = false;
    //     return term ? of(this._filter(term)) : of(this.participantesLista.slice());
    //   })
    // );
  }
  filterOptions(searchTerm: string): void{
    if(searchTerm.trim() !== ''){
      this.filtroOpciones = this.participantesLista.filter((item: Participante) => {
        return item.Personas.nombres_per.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }else{
      this.filtroOpciones = []
    }
  }

  filtrarParticipantesNoInscritos(){
    this.filteroptionslist = this.formcontrol.valueChanges.pipe(
      distinctUntilChanged(),
      tap(()=> this.datosCargados = true),
      startWith(null),
      //map((option => this._filter(option || '')))
      map((option: string | null ) => {
        this.datosCargados = false;
        return option ? this._filter(option) : this.participantesLista.slice()
      })
    );
    //this.mostrarParticipantesNoInscritos();
  }

  
  private _filter(value: string): Participante[]{
    //console.log('FILTRADO', this.participantesLista )
    const filterValue = value.toLowerCase();   
    return this.participantesLista.filter(option => 
      option.Personas.nombres_per.toLowerCase().includes(filterValue) || 
      option.Personas.apellidos.toLowerCase().includes(filterValue));
  }
}
