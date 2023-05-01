import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import { GetCapacitacionComponent } from './pages/capacitacion/get-capacitacion/get-capacitacion.component';


const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        component:DashboardComponent,
      },
      {
        path:'capacitacion',
        loadComponent: () => import('../layout/pages/capacitacion/capacitacion.component'),
        
      },
      {
        path:'capacitacion/ver/:id_capacitacion',
        loadComponent: () => import('../layout/pages/capacitacion/get-capacitacion/get-capacitacion.component')
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }