import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreaGrupoSeguimiento, GrupoSeguimiento, UnSeguimiento } from '../models/seguimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;
  


  constructor(private http: HttpClient) { 
    
  }
  getGruposSeguimiento(): Observable<GrupoSeguimiento> {
    return this.http.get<GrupoSeguimiento>(`${this.apiUrl}grupoSeguimiento/readAll`);
  }
  crearSeguimiento(gSeguimiento: CreaGrupoSeguimiento): Observable<CreaGrupoSeguimiento> {
    return this.http.post<CreaGrupoSeguimiento>(`${this.apiUrl}grupoSeguimiento/create`, gSeguimiento);
  }
  editarSeguimiento(id_grupo_seguimiento: number, modelo: CreaGrupoSeguimiento): Observable<CreaGrupoSeguimiento> {
    return this.http.put<CreaGrupoSeguimiento>(`${this.apiUrl}grupoSeguimiento/update/`, modelo);
  }
  verGrupoSeguimiento(id_grupo_seguimiento: number): Observable<UnSeguimiento> {
    return this.http.get<UnSeguimiento>(`${this.apiUrl}grupoSeguimiento/read/${id_grupo_seguimiento}`);
  }

}
