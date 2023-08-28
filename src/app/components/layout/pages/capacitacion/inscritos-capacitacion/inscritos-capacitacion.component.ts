import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { ActivatedRoute } from '@angular/router';
//MATERIAL

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Inscrito, ParticipantesInscritos } from 'src/app/models/capacitacion';
import { Observable, map, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AllParticipante, Participante } from 'src/app/models/participante';
import { ParticipanteService } from 'src/app/services/participante.service';
import { PaginatorService } from 'src/app/services/Paginator.service';


@Component({
  selector: 'app-inscritos-capacitacion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule,NgFor,
     MatInputModule , MatTableModule,MatPaginatorModule, MatAutocompleteModule,FormsModule, ReactiveFormsModule
    
    ],
  templateUrl: './inscritos-capacitacion.component.html',
  styleUrls: ['./inscritos-capacitacion.component.css'],
  providers: [
    // ...
    { provide: MatPaginatorIntl, useClass: PaginatorService } // Usa el servicio personalizado
  ]
})
export class InscritosCapacitacionComponent implements OnInit {

  
  options: AllParticipante[] = [];
  filteredOptions!: Observable<AllParticipante[]> ;
  listParticipantes$: Observable<Participante> | undefined;
  
  displayedColumns: string[] = ['id_participante', 'nombres_per', 'apellidos', 'nro_ci', 'codigo_participante','ocupacion', 'id_usuario', 'accion'];
  informacionParticipante$: Observable<ParticipantesInscritos> | undefined;
  filterValue = '';
  dataSource = new  MatTableDataSource<Inscrito>();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  
  activatedRoute = inject(ActivatedRoute);
  capacitacionService = inject(CapacitacionService);
  participantesService = inject(ParticipanteService);

  listTabla$ = this.capacitacionService.listaTabla$;
  constructor(){
    this.listParticipantes$ = this.participantesService.getParticipantes();
    this.listParticipantes$.subscribe({
      next: (data: Participante) => {
        const participantes = data;
        this.options = data.AllParticipantes;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  ngOnInit(): void {
    
    this.mostrarParticipantes();

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

  mostrarParticipantes(){
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];
    //this.informacionParticipante$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion)
     this.listTabla$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion);
     this.listTabla$.subscribe({
       next: (data: ParticipantesInscritos) => {
         this.dataSource.data = data.inscritos;

         console.log('DATASOURCE DEL LIST-TABLA',this.dataSource.data);
         this.dataSource.filterPredicate = (data: Inscrito, filter: string) => {
           const personasData = data.Participantes.Personas;

           const values = Object.values(personasData);
           const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
           return valueStrings.some(value => value.includes(filter));
         };
       },error: (error) => {
         console.log(error);
       }
     });
  };

}
