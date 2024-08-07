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
        path:'usuario',
        loadComponent: () => import('../layout/pages/usuario/usuario.component'),
        
      },
      {
        path:'usuario/gestionar-roles',
        loadComponent: () => import('../layout/pages/usuario/gestionar-roles-usuario/gestionar-roles-usuario.component'),
        
      },
      {
        path:'usuario/gestionar-roles/ver/:id_tipo_usuario',
        loadComponent: () => import('../layout/pages/usuario/gestionar-roles-usuario/niveles-acceso/niveles-acceso.component'),
        
      },
      {
        path:'empleado',
        loadComponent: () => import('../layout/pages/empleado/empleado.component'),
      },
      {
        path:'persona',
        loadComponent: () => import('../layout/pages/persona/persona.component'),
        
      },
      {
        path:'participante',
        loadComponent: () => import('../layout/pages/participante/participante.component'),
        
      },
      {
        path:'seguimiento',
        loadComponent: () => import('../layout/pages/seguimiento/seguimiento.component'),
        
      },
      {
        path:'capacitacion',
        loadComponent: () => import('../layout/pages/capacitacion/capacitacion.component'),
        
      },

      {
        path:'capacitacion/ver/:id_capacitacion',
        loadComponent: () => import('../layout/pages/capacitacion/get-capacitacion/get-capacitacion.component')
      },
      {
        path:'seguimiento/ver/:id_seguimiento',
        loadComponent: () => import('../layout/pages/seguimiento/grupo-seguimiento/grupo-seguimiento.component')
      },
      {
        path:'seguimiento/ver/:id_seguimiento/importar',
        loadComponent: () => import('../layout/pages/seguimiento/importar-contactos/importar-contactos.component')
      },
      {
        path: 'contactos/subir',
        loadComponent: () => import('../layout/pages/contactos/subir-contactos/subir-contactos.component')
      },
      {
        path:'contactos',
        loadComponent: () => import('../layout/pages/contactos/contactos.component')
      }
      

      // {
      //   path:'capacitacion/inscritos',
      //   loadComponent: () => import('../layout/pages/capacitacion/inscritos-capacitacion/inscritos-capacitacion.component')
      // }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
