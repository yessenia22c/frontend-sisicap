import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargosList, Empleado, EmpresasList, NuevoEmpleado } from '../models/empleado';
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

}
