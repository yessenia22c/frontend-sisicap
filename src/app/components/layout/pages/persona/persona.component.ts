import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Persona, AllPersona } from 'src/app/models/persona';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';


import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

import { MatSort } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { Observable } from 'rxjs';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule, MatButtonModule,MatIconModule],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export default class PersonaComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id_persona', 'nombres_per', 'primer_apellido', 'segundo_apellido', 'nro_ci', 'correo', 'telefono', 'fecha_nac', 'sexo', 'ciudad', 'Pais', 'accion'];
  
  dataSource = new  MatTableDataSource<AllPersona>();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private personaServices: PersonaService) {
    
  }
  ngOnInit(): void {
    this.mostrarPersonas();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarPersonas(){
    this.personaServices.getPersonas().subscribe({
      next: (resp: Persona) => {
        console.log('RESP',resp);
        this.dataSource.data = resp.AllPersonas;
        console.log('DATASOURCE',this.dataSource);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  };
}
/** Builds and returns a new User. */

