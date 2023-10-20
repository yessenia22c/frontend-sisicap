import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../../shared/material.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ControlRolesDirective } from 'src/app/directivas/control-roles.directive';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ControlRolesDirective
    
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
    // RouterModule
  ],
  // exports: [
  //   RouterModule
  //  ]
})
export class LayoutModule { }
