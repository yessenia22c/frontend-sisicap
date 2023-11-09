import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NuevoUsuario, TiposUsuarios, UsuariosSistema } from '../models/Usuarios';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { Niveles, TipoUsuarioList, Tipo_usuario, UnTipoUsuario } from '../models/tipo_usuario';

@Injectable({
  providedIn: 'root'
})
export class Tipo_usuarioService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;

  constructor(private http: HttpClient) { }

  getTiposUsuarios(): Observable<TipoUsuarioList> {
    return this.http.get<TipoUsuarioList>(`${this.apiUrl}tipoUsuario/readAll`);
  }
  getUnTipoUsuario(id_tipo_usuario: number): Observable<UnTipoUsuario> {
    return this.http.get<UnTipoUsuario>(`${this.apiUrl}tipoUsuario/read/${id_tipo_usuario}`);
  }
  crearTipoUsuario(tipo_usuario: Tipo_usuario): Observable<Tipo_usuario> {
    return this.http.post<Tipo_usuario>(`${this.apiUrl}tipoUsuario/create`, tipo_usuario);
  }
  getNivelesAcceso(): Observable<Niveles> {
    return this.http.get<Niveles>(`${this.apiUrl}niveles/readAll`);
  }
}
