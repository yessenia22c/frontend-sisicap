import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FlexLayoutModule } from '@angular/flex-layout';
import {Capacitacion, UnaCapacitacion} from '../../../../models/capacitacion';

import {CapacitacionService} from '../../../../services/capacitacion.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormCapacitacionComponent } from './form-capacitacion/form-capacitacion.component';


import { RouterModule } from '@angular/router';
//import { LayoutRoutingModule } from '../../layout-routing.module'; 

@Component({
  selector: 'app-capacitacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule,MatButtonModule,
     FlexLayoutModule, MatDialogModule, MatIconModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export default class CapacitacionComponent implements OnInit {
  private capacitacionService = inject(CapacitacionService);

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog){
    
  }
  //informacionCapacitaciones: Capacitacion[] = null;
  informacionCapacitaciones$: Observable<Capacitacion>  |  undefined;
  filtrados: UnaCapacitacion[] = [];
  capacitacionesLista: UnaCapacitacion[] = [];
  gridColumns = 4;
 

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

    //gridColumns: any;
  
  ngOnInit(): void {
    this.mostrarCapacitaciones();
    //console.log('SON LOS OBASEBAVLEs',this.informacionCapacitaciones$);
    
  }
  mostrarCapacitaciones(){
    this.informacionCapacitaciones$ = this.capacitacionService.getCapacitaciones();
    this.informacionCapacitaciones$.subscribe({
      next: (data) => {
        this.capacitacionesLista = data.UnaCapacitacion;
        console.log('CAPACITACIONES',this.capacitacionesLista); 
        this.filtrados = data.UnaCapacitacion;
      },
      error: (error) => {
        console.error('Error cargando capacitaciones', error);
      },
    })
  }

  agregaCapacitacion() {
    this.dialog.open(FormCapacitacionComponent,{
      disableClose: true,
      width: '400px',
    }).afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){
        this.informacionCapacitaciones$ = this.capacitacionService.getCapacitaciones();
      }
    })
  }
  verCapacitacion(id: number){
    console.log('ID CAPACITACION',id);
  } 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('filterValue',filterValue);
    if (!filterValue) {
      this.filtrados = this.capacitacionesLista ;
      return;
    }
    this.filtrados = this.filtrados.filter(item =>item.nombre_capacitacion.toLowerCase().includes(filterValue) || item.Categoria.nombre_categoria.toLowerCase().includes(filterValue));
    console.log('filtrados lista',this.capacitacionesLista.filter(item =>item.nombre_capacitacion.toLowerCase().includes(filterValue)));     
  }

}


