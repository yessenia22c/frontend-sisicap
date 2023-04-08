import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component'
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

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
    
    loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole:  1}//el 1 es que es tipo administrador
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
