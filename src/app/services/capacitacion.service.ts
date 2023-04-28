import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Capacitacion } from '../models/capacitacion';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;
  
constructor(private http: HttpClient) {}


getCapacitaciones(): Observable<Capacitacion>{
  return this.http.get<Capacitacion>(`${this.apiUrl}capacitacion/readAll`);
 
}
crearCapacitacion(capacitacion: Capacitacion): Observable<Capacitacion>{
  return this.http.post<Capacitacion>(`${this.apiUrl}capacitacion/create`, capacitacion);
}
actualizarCapacitacion(id_capacitacion:number, capacitacion: Capacitacion): Observable<Capacitacion>{
  return this.http.put<Capacitacion>(`${this.apiUrl}capacitacion/update/${id_capacitacion}`, capacitacion);
}
eliminarCapacitacion(id_capacitacion:number, capacitacion: Capacitacion): Observable<Capacitacion>{
  return this.http.put<Capacitacion>(`${this.apiUrl}capacitacion/delete/${id_capacitacion}`, capacitacion);
}
}
