import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitacion, GetCapacitacion } from 'src/app/models/capacitacion';
import { Observable, catchError, finalize, of } from 'rxjs';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

//MATERIAL
import {MatGridListModule} from '@angular/material/grid-list';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-get-capacitacion',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule, MatListModule,RouterModule ],
  templateUrl: './get-capacitacion.component.html',
  styleUrls: ['./get-capacitacion.component.css']
})
export default class GetCapacitacionComponent implements OnInit {
  public colSize=4;
  public cols= 3;
  public isMobile: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, 
    private capacitacionService: CapacitacionService,
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    ) {
      this.breakpointObserver.observe([
        Breakpoints.Handset
        
      ]).subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          
          this.colSize = 1;
          this.cols = 1;

        } else {
          this.colSize = 4 ;
          this.cols = 3;
        }
      });
     }
  
  capacitacion$: Observable<GetCapacitacion>  |  undefined;

  
  ngOnInit(): void {
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];
    //console.log('PARAMETRO',parametro);
    this.capacitacion$ = this.capacitacionService.getCapacitacion(id_capacitacion);
      this.capacitacion$.pipe(
        tap((data: GetCapacitacion) => {
          
          console.log('CAPACITACION',data);
        }
      ),catchError((err) => {
        console.log('ERROR',err);
        return of([]);
      })
      ).subscribe();    
    // if (id_capacitacion) {
         
    //   //console.log('CAPACITACION',this.capacitacion$);
    // }
  }
  verCapacitacion(id:number){
    console.log('ID CAPACITACION',id);
  }

}

