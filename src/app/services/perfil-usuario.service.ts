import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;
  

  constructor( private http: HttpClient ) { 
  }
  
  getUsuario(): Observable<PerfilUsuario>{
    return this.http.get<PerfilUsuario>(`${this.apiUrl}auth/perfil`)
  }
  
}
