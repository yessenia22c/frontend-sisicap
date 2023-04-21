import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Capacitacion} from '../../../../models/capacitacion';

import {CapacitacionService} from '../../../../services/capacitacion.service'
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LayoutModule } from '../../layout.module';

@Component({
  selector: 'app-capacitacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule,MatButtonModule, FlexLayoutModule],
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export default class CapacitacionComponent implements OnInit {
  private capacitacionService = inject(CapacitacionService);


  //informacionCapacitaciones: Capacitacion[] = null;
  informacionCapacitaciones$: Observable<Capacitacion>  |  undefined;
 
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

    //gridColumns: any;
  constructor(private breakpointObserver: BreakpointObserver){}
  ngOnInit(): void {
    this.informacionCapacitaciones$ = this.capacitacionService.getCapacitaciones();
    //console.log('SON LOS OBASEBAVLEs',this.informacionCapacitaciones$);
    
  }

}
