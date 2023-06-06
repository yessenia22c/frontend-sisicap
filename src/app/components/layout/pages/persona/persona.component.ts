import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Persona, AllPersona, creaPersona } from 'src/app/models/persona';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';


import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

import { MatSort } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { PersonaService } from 'src/app/services/persona.service';
import { FormPersonaAddEditComponent } from './form-persona-add-edit/form-persona-add-edit.component';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,MatFormFieldModule,
    MatInputModule, MatButtonModule,MatIconModule, MatDialogModule],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export default class PersonaComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id_persona', 'nombres_per','apellidos', 'nro_ci', 'correo', 'telefono', 'fecha_nac', 'sexo', 'ciudad', 'Pais', 'accion'];
  informacionPersonas$: Observable<Persona> | undefined;
  dataSource = new  MatTableDataSource<AllPersona>();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private personaServices: PersonaService, public dialog: MatDialog) {
    
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
    this.informacionPersonas$ = this.personaServices.getPersonas();

    this.informacionPersonas$.subscribe({
      next: (resp: Persona) => {
        console.log('RESP',resp);
        this.dataSource.data = resp.AllPersonas;
        console.log('DATASOURCE',this.dataSource);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  };

  nuevaPersona() {
    this.dialog.open(FormPersonaAddEditComponent,{
      disableClose: true,
      width: '700px',
    }).afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){
        this.mostrarPersonas();
      }
    })
    
  }
  editarPersona(dataPersona: creaPersona) {
    
    this.dialog.open(FormPersonaAddEditComponent,{
      disableClose: true,
      width: '700px',
      data: dataPersona
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.mostrarPersonas();
      }
    })
    
  }
}


