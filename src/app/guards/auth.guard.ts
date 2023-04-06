import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServiceLogin: LoginService,
    private router: Router
  ){

  }
  canActivate(): boolean{
    if(!this.authServiceLogin.isAuth()){
      console.log('EL TOKEN NO ES VALIDO O YA EXPIRÓ');
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
  
}
