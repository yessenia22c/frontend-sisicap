import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../../shared/material.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    
    
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
