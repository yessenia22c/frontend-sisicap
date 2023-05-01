import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import {Capacitacion} from '../../../../models/capacitacion';

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
     FlexLayoutModule, MatDialogModule, MatIconModule, RouterModule],
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export default class CapacitacionComponent implements OnInit {
  private capacitacionService = inject(CapacitacionService);

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog){
    
  }
  //informacionCapacitaciones: Capacitacion[] = null;
  informacionCapacitaciones$: Observable<Capacitacion>  |  undefined;
  
  gridColumns = 4;
 

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

    //gridColumns: any;
  
  ngOnInit(): void {
    this.informacionCapacitaciones$ = this.capacitacionService.getCapacitaciones();
    //console.log('SON LOS OBASEBAVLEs',this.informacionCapacitaciones$);
    
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

}


