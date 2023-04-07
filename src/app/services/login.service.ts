import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuarios'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL_BACKEND = 'http://127.0.0.1:4000/api/v1';
  

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  /*getUsuarios (){
    return this.http.get(`${this.API_URL_BACKEND}/login`)
  }*/

  login(usuario: Usuario) {
    return this.http.post(`${this.API_URL_BACKEND}/auth/login`,usuario)
  }
  isAuth():boolean{
    const access_token = localStorage.getItem('access_token')
    if( this.jwtHelper.isTokenExpired(access_token) || !localStorage.getItem('access_token')){
      return false;
    }
    return true
  }
}
