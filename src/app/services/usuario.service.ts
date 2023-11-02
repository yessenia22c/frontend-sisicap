import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario, TiposUsuarios, UsuariosSistema } from '../models/Usuarios';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuariosSistema> {
    return this.http.get<UsuariosSistema>(`${this.apiUrl}usuario/readAll`);
  }
  crearUsuario(usuario: NuevoUsuario): Observable<NuevoUsuario> {
    return this.http.post<NuevoUsuario>(`${this.apiUrl}usuario/create`, usuario);
  } 

  actualizarUsuario(usuario: NuevoUsuario): Observable<NuevoUsuario> {
    return this.http.put<NuevoUsuario>(`${this.apiUrl}usuario/update`, usuario);
  }

  getTiposUsuarios(): Observable<TiposUsuarios> {
    return this.http.get<TiposUsuarios>(`${this.apiUrl}tipoUsuarios/readAll`);
  }
}

