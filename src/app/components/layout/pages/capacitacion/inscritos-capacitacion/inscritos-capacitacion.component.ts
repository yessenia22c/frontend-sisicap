import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Inscrito, ParticipantesInscritos } from 'src/app/models/capacitacion';
import { Observable, map, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AllParticipante, Participante } from 'src/app/models/participante';
import { ParticipanteService } from 'src/app/services/participante.service';


@Component({
  selector: 'app-inscritos-capacitacion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule,
     MatInputModule , MatTableModule,MatPaginatorModule, MatAutocompleteModule,FormsModule, ReactiveFormsModule
    
    ],
  templateUrl: './inscritos-capacitacion.component.html',
  styleUrls: ['./inscritos-capacitacion.component.css']
})
export class InscritosCapacitacionComponent implements OnInit {

  myControl = new FormControl<string | Participante>('');
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

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     const name = typeof value === 'string' ? value : value?.AllParticipantes;
    //     return name ? this._filter(name as string) : this.options.slice();
    //   }),
    // );
  }
  // displayFn(user: AllParticipante): string {
  //   return user && user.Personas.nombres_per ? user.Personas.nombres_per : '';
  // }

  // private _filter(name: string): AllParticipante[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(option => option.Personas.nombres_per.toLowerCase().includes(filterValue));
  // }
  


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

    this.informacionParticipante$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion);

    this.informacionParticipante$.subscribe({
      next: (resp: ParticipantesInscritos) => {
        console.log('RESP',resp);
        this.dataSource.data = resp.inscritos;
        console.log('DATASOURCE INSCRITOS',this.dataSource.data);

        //Filter predicate ayuda a obtener los datos relevantes para la busqueda dentro del DataSource
        this.dataSource.filterPredicate = (data: Inscrito, filter: string) => {
          const personasData = data.Participantes.Personas;

          const values = Object.values(personasData);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };

        console.log('DATASOURCE',this.dataSource);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  };
}
