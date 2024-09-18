import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsignarNuevoEmpleado, CargosList, Empleado, EmpresasList, NuevoEmpleado, PersonaNoEmpleado, UnEmpleado } from '../models/empleado';
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

  crearEmpleado(modelo: NuevoEmpleado): Observable<NuevoEmpleado> {
    return this.http.post<NuevoEmpleado>(`${this.apiUrl}empleado/create`, modelo);
  }
  crearAsignarNuevoEmpleado(modelo: AsignarNuevoEmpleado): Observable<AsignarNuevoEmpleado> {
    return this.http.post<AsignarNuevoEmpleado>(`${this.apiUrl}empleado/asignarNuevo`, modelo);
  }
  actualizaEmpleado( modelo: NuevoEmpleado): Observable<NuevoEmpleado> {
    return this.http.put<NuevoEmpleado>(`${this.apiUrl}empleado/update`, modelo);
  }

  listaCargos(): Observable<CargosList> {
    return this.http.get<CargosList>(`${this.apiUrl}cargos/readAll`);
  }

  listaEmpresas(): Observable<EmpresasList>{
    return this.http.get<EmpresasList>(`${this.apiUrl}empresas/readAll`);
  }

  eliminarEmpleado(id: number): Observable<NuevoEmpleado> {
    return this.http.delete<NuevoEmpleado>(`${this.apiUrl}empleado/delete/${id}`);
  }

  getPersonasNoEmpleados(): Observable<PersonaNoEmpleado> {
    return this.http.get<PersonaNoEmpleado>(`${this.apiUrl}empleado/personasAll`);
  }
  verEmpleado(id: number): Observable<UnEmpleado> {
    return this.http.get<UnEmpleado>(`${this.apiUrl}empleado/read/${id}`);
  }
}
