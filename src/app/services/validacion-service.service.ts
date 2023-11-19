import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ValidacionServiceService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;

  constructor(private http: HttpClient) { }

  validarNombreUsuario(nombre_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}validacion/usuario/${nombre_usuario}`);
  }
  validarNroCi(nro_ci: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}validacion/carnet/${nro_ci}`);
  }
  validarCorreo(correo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}validacion/correo/${correo}`);
  }
  validarNumeroContacto(numero_contacto: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}validacion/numeroContacto/${numero_contacto}`);
  }
}
