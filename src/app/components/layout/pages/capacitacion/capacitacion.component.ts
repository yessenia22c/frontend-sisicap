import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {Capacitacion, UnaCapacitacion} from '../../../../models/capacitacion'
import {CapacitacionService} from '../../../../services/capacitacion.service'
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-capacitacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export default class CapacitacionComponent implements OnInit {
  private capacitacionService = inject(CapacitacionService);


  //informacionCapacitaciones: Capacitacion[] = null;
  informacionCapacitaciones$: Observable<Capacitacion>  |  undefined;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

  
  constructor(private breakpointObserver: BreakpointObserver){}
  ngOnInit(): void {
    this.informacionCapacitaciones$ = this.capacitacionService.getCapacitaciones();
    //console.log('SON LOS OBASEBAVLEs',this.informacionCapacitaciones$);
    
  }

}
