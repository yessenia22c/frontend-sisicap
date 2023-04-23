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
getListaCapacitacion(): Observable<Capacitacion[]>{
   return this.http.get<Capacitacion[]>(`${this.apiUrl}capacitacion/readAll`);
  
}

getCapacitaciones(): Observable<Capacitacion>{
  return this.http.get<Capacitacion>(`${this.apiUrl}capacitacion/readAll`);
 
}
}
