import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service'; // Asegúrate de tener un servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isAuth()) {
      this.router.navigate(['/sisicap']);
      return false;
    }
    return true;
  }
}