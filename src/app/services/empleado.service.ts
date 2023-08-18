import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado';
import { CreaGrupoSeguimiento } from '../models/seguimiento';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;
  

  constructor(private http: HttpClient) { 
    
  }
  getEmpleados(): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}empleado/readAll`);
  }

  

}
