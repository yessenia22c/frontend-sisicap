import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component'
//import { PanelComponent } from './components/panel/panel.component';
const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  {
    path:'**',
    redirectTo: 'login',
    pathMatch: 'full'
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
