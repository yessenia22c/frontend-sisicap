import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';



//iMPORTACIONES PARA INSCRIPCIONES
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatGridListModule } from '@angular/material/grid-list';
import { Inscripciones, Participante, ParticipantesNoInscritos } from 'src/app/models/capacitacion';
import { ActivatedRoute } from '@angular/router';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { MatInputModule } from '@angular/material/input';
//para seleccionar
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ConnectionPositionPair, ConnectedPosition  } from '@angular/cdk/overlay';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OverlayModule, } from '@angular/cdk/overlay';
@Component({
  selector: 'app-dialog-inscribir-participante',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule, 
    MatFormFieldModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatGridListModule,
     MatInputModule, OverlayModule, MatSelectModule],
  templateUrl: './dialog-inscribir-participante.component.html',
  styleUrls: ['./dialog-inscribir-participante.component.css']
})
export class DialogInscribirParticipanteComponent implements OnInit {


  formcontrol = new FormControl('');
  filteroptionslist!: Observable<Participante[]>;
  participantesSeleccionados: string[] = [];

  @ViewChild('inscripcionInput') inscripcionInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);
  id_cap!: number;
  
  

  
  filtroOpciones!: Participante[];

  activatedRoute = inject(ActivatedRoute);
  capacitacionService = inject(CapacitacionService);
  participantesLista!: Participante[] ;
  
  listaParticipantes$!: Observable<ParticipantesNoInscritos>;


  seleccion = new SelectionModel<any>(true, []);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  ngOnInit(): void {
    this.id_cap = this.data.id_capacitacion;
    this.filtrarParticipantesNoInscritos();
    this.mostrarParticipantesNoInscritos();
    


  }
  mostrarParticipantesNoInscritos(){
    this.id_cap = this.data.id_capacitacion;
    const id_capacitacion = this.id_cap;
    //console.log('ID CAPACITACION NO INSCRITOs',id_capacitacion);

    
    this.listaParticipantes$ = this.capacitacionService.getParticipantesNoInscrtios(id_capacitacion);
     this.listaParticipantes$.subscribe({
       next: (resp: ParticipantesNoInscritos) => {
          console.log('NO INSCRITOS',resp);
          this.participantesLista = resp.participantes;
          console.log('participantes asig',this.participantesLista )
       }
     });
  }

  filtrarParticipantesNoInscritos(){
    this.filteroptionslist = this.formcontrol.valueChanges.pipe(
      startWith(null),
      //map((option => this._filter(option || '')))
      map((option: string | null ) => (option ? this._filter(option) : this.participantesLista.slice())),
    );
    //this.mostrarParticipantesNoInscritos();
  }

  



  remove(dato: string): void {
    const index = this.participantesSeleccionados.indexOf(dato);
    if (index >= 0) {
      this.participantesSeleccionados.splice(index, 1);
      this.announcer.announce(`Removed ${dato}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const seleccionado = event.option.value;
    const selectedValue = event.option.viewValue;
    this.participantesSeleccionados.push(selectedValue);
    //Para que ya no se añada a la lista de participantesSelecionados
    // if (!this.participantesSeleccionados.includes(selectedValue)) {
    //   this.participantesSeleccionados.push(selectedValue);
    // }

    this.filteroptionslist = this.filteroptionslist.pipe(
      map(options => options.filter(option => option.id_participante !== seleccionado.id_participante))
    );

    this.inscripcionInput.nativeElement.value = '';
    this.formcontrol.setValue(null);

    //this.filtrarParticipantesNoInscritos();

  }

  removeOption(option: string) {
    const index = this.participantesSeleccionados.indexOf(option);
    if (index >= 0) {
      this.participantesSeleccionados.splice(index, 1);
      this.announcer.announce(`Removed ${option}`);
    }
  }

  
  private _filter(value: string): Participante[]{
    //console.log('FILTRADO', this.participantesLista )
    const filterValue = value.toLowerCase();   
    return this.participantesLista.filter(option => 
      option.Personas.nombres_per.toLowerCase().includes(filterValue) || 
      option.Personas.apellidos.toLowerCase().includes(filterValue));
  }
}
