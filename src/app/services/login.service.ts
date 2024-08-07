import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuarios'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private authState = new BehaviorSubject<Usuario | null>(null);
  authState$ = this.authState.asObservable();
  //API_URL_BACKEND = 'http://127.0.0.1:4000/api/v1';
  API_URL_BACKEND = `${environment.endPoint}`;
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router : Router
    ) { }


  login(usuario: Usuario) {
    return this.http.post(`${this.API_URL_BACKEND}/auth/login`,usuario)
  }
  getToken():boolean {
    const myToken = localStorage.getItem('access_token');
    if (this.jwtHelper.isTokenExpired(myToken) || !localStorage.getItem('access_token')){
      
      this.router.navigate(['/login']);
      console.log("NO PUEDES ACCEDER VUELVES A LOGIN");
      return false
    }else{
      console.log("HAZ ACCEDIDO ")
      
      return true
    }
  }
  isAuth():boolean{
    const access_token = localStorage.getItem('access_token')
    if( this.jwtHelper.isTokenExpired(access_token) || !localStorage.getItem('access_token')){
      
      return false;
    }
    return true
  }

  limpiarToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuarioId');
  }
  setAuthState(user: Usuario | null) {
    this.authState.next(user);
  }
}
