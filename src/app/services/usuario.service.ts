import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  crearNuevoUsuario(usuario: NuevoUsuario, archivo:File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nuevoUsuario', JSON.stringify(usuario));
    const headers = new HttpHeaders();
    
    return this.http.post<NuevoUsuario>(`${this.apiUrl}usuario/create`, formData, {headers: headers});
  } 

  actualizarUsuario(usuario: NuevoUsuario, archivo:File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nuevoUsuario', JSON.stringify(usuario));
    const headers = new HttpHeaders();
    return this.http.put<NuevoUsuario>(`${this.apiUrl}usuario/update`,  formData, {headers: headers});
  }

  getTiposUsuarios(): Observable<TiposUsuarios> {
    return this.http.get<TiposUsuarios>(`${this.apiUrl}tipoUsuarios/readAll`);
  }

  eliminarUsuario(id_usuario: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}usuario/delete/${id_usuario}`);
  }
}

