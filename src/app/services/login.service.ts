import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuarios'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL_BACKEND = 'http://127.0.0.1:4000/api/v1';
  constructor(private http: HttpClient) { }

  /*getUsuarios (){
    return this.http.get(`${this.API_URL_BACKEND}/login`)
  }*/

  login(usuario: Usuario) {
    return this.http.post(`${this.API_URL_BACKEND}/auth/login`,usuario)
  }
}
