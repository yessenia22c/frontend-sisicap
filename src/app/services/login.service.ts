import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuarios'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Usuario_perfil } from '../models/PerfilUsuario';
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
    private jwtHelper: JwtHelperService
    ) { }


  login(usuario: Usuario) {
    return this.http.post(`${this.API_URL_BACKEND}/auth/login`,usuario)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isAuth():boolean{
    const access_token = localStorage.getItem('access_token')
    if( this.jwtHelper.isTokenExpired(access_token) || !localStorage.getItem('access_token')){
      
      return false;
    }
    return true
  }
  getProfile() {
     const url = `${environment.endPoint}/auth/usuario`;
     return this.http.get<Usuario>(url);
   }
  limpiarToken() {
    localStorage.removeItem('access_token');
    
    //this.tokenService.clearToken();
  }
  setAuthState(user: Usuario | null) {
    this.authState.next(user);
  }
}
