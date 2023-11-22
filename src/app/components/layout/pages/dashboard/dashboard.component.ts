import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/models/Usuarios';
import { LoginService } from 'src/app/services/login.service';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Color } from '@swimlane/ngx-charts';
import { DataDashboard, Datum } from 'src/app/models/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { ControlRolesDirective } from 'src/app/directivas/control-roles.directive';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';


import {MatCalendarHeader, MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatCardModule, RouterModule, ControlRolesDirective, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
  ],
})

export class DashboardComponent implements OnInit {
  user: Usuario | null = null;
  selected!: Date | null;

  
  informacionCiudadesPartiiantes$ : Observable<DataDashboard> | undefined;
  informacionGeneroPartiiantes$ : Observable<DataDashboard> | undefined;
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
  private router = inject(Router);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {
    //Datos del calendario
    
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
    this.informacionGeneroPartiiantes$ = this.dashboardService.generoParticipantes;
    this.informacionGeneroPartiiantes$.subscribe({
      next: (data) => {
        console.log(data);
        this.generoData = data.data;
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
  get genero() {
    
    return this.generoData
  }
  //Solo para las gráficas

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,

    domain: ['#01A83C', '#6AA901', '#90E167', '#E1660C', '#07D6DC', '#0836DC', '#E02D0A', '#E1508C', '#815BE0']
  };
  colorScheme2: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,

    domain: ['#FFA7EF', '#3D9AFC']
  };
  
  //single: any[] = [];
  multi: any[] = [];
  generoData: Datum[] = [];

  view: [number, number] = [600, 350];
  view2: [number, number] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  
  // options
  gradientRueda: boolean = true;
  //showLegendRueda: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

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
