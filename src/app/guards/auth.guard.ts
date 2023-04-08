import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, observable } from 'rxjs';
import {LoginService} from '../services/login.service';



  
export const myGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot)=> {
    const loginService = inject(LoginService)
    return loginService.getToken();
  }
  

// export class AuthGuard {
//   constructor(
//     private authServiceLogin: LoginService,
//     private router: Router
//   ){
//   }

  
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   const token = this.authServiceLogin.getToken();
  //   if (!token) {
  //     console.log('EL TOKEN NO ES VALIDO O YA EXPIRÓ');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  //}
  
//}
