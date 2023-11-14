import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/models/Usuarios';
import { LoginService } from 'src/app/services/login.service';

import { CommonModule } from '@angular/common';

import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Color } from '@swimlane/ngx-charts';
import { CiudadesParticipante } from 'src/app/models/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Usuario | null = null;

  informacionCiudadesPartiiantes$ : Observable<CiudadesParticipante> | undefined;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return ;
      }

      return  [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 2 }
      ];
    })
  );

  colores = '#5AA454' ;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {
    
    // Object.assign(this, { single })
  }

  ngOnInit() {
    this.informacionCiudadesPartiiantes$ = this.dashboardService.ciudadesParticipantes;
    this.informacionCiudadesPartiiantes$.subscribe({
      next: (data) => {
        console.log(data);
        this.multi = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.loginService.authState$
    .subscribe(user => {
      //console.log('change');
      this.user = user;
    });
  }

  get single() {
    
    return this.multi
  }
  //Solo para las gráficas

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,

    domain: ['#01A83C', '#6AA901', '#90E167', '#E1660C', '#07D6DC', '#0836DC', '#E02D0A', '#E1508C', '#815BE0']
  };
  //single: any[] = [];
  multi: any[] = [];

  view: [number, number] = [600, 350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Ciudades de Bolivia';
  showYAxisLabel = true;
  yAxisLabel = 'Participantes';

  


  onSelect(event: any) {
    console.log(event);
  }

  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];
}
