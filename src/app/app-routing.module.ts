import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './pages/login/login.component'
import { myGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthRedirectGuard } from './guards/authLogin.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectGuard]
  },
  {
    path: 'sisicap',
    
    loadChildren: () => import('./components/layout/layout.module').then(x => x.LayoutModule),
    canActivate: [myGuard],
    //canActivate: [myGuard, RoleGuard],
    //data: { expectedRole:  1},//el 1 es que es tipo administrador
    
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
