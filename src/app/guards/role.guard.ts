import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

import decode  from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authServiceLogin: LoginService,
    public router: Router
  ){
    
  }
  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data['expectedRole'];//AQUI ME QUEDE 12/03/2023

    const access_token = localStorage.getItem('access_token');

    if (access_token) {

      
      const {tipoUser}: {tipoUser: number}= decode(access_token);
      
      console.log(tipoUser)
      
      if ( !this.authServiceLogin.isAuth() || tipoUser !== expectedRole){
        console.log('USUARIO NO AUTORIZADO PARA LA VISTA');
        this.router.navigate(['login']);
        return false;
      }
      
      //console.log(descodificadoToken); //Me muestra todo lo descoficado del token
    } else {
      console.log('El token de acceso no se encontró en el almacenamiento local.');
    }

    //console.log(decode(access_token);
    return true;
  }
  
}
