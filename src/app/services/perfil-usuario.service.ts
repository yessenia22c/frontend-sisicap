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
  private userId!: number ;

  constructor( private http: HttpClient, ) { 
  }
  
  getUsuario(): Observable<PerfilUsuario>{
    console.log(this.http.get<PerfilUsuario>(`${this.apiUrl}auth/perfil`));
    return this.http.get<PerfilUsuario>(`${this.apiUrl}auth/perfil`)
  }
  
}
