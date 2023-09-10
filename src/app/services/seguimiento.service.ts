import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActualizarContactoSeguimiento, AllContactosSeguimiento, AllEstado, AllTipoSeguimiento, ContactosAgregar, ContactosSeguimiento, CreaGrupoSeguimiento, Estado, GrupoSeguimiento, UnSeguimiento } from '../models/seguimiento';
import { Observable } from 'rxjs';
import { AllCambio, Cambio, SeguimientoContacto } from '../models/contacto';

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

  verContactosSeguimiento(id_grupo_seguimiento:number):Observable<ContactosSeguimiento>{
    return this.http.get<ContactosSeguimiento>(`${this.apiUrl}historicoLlamadas/readAll/${id_grupo_seguimiento}`);
  }

  subirContactosSeguimiento(modelo:ContactosAgregar):Observable<ContactosAgregar>{
    return this.http.post<ContactosAgregar>(`${this.apiUrl}historicoLlamadas/subir/`, modelo);
  }
  actualizarContactoSeguimiento(modelo:SeguimientoContacto):Observable<SeguimientoContacto>{
    return this.http.put<SeguimientoContacto>(`${this.apiUrl}historicoLlamadas/update`, modelo);
  }
  verEstadosSeguimiento():Observable<AllEstado>{
    return this.http.get<AllEstado>(`${this.apiUrl}estados/readAll`);
  }
  verTipoSeguimiento():Observable<AllTipoSeguimiento>{
    return this.http.get<AllTipoSeguimiento>(`${this.apiUrl}tipoSeguimiento/readAll`);
  }

  registrarCambios(modelo: Cambio):Observable<Cambio>{
    return this.http.post<Cambio>(`${this.apiUrl}historicoLlamadas/registraCambios`, modelo);
  }
  verCambios(id_historico:number):Observable<AllCambio>{
    return this.http.get<AllCambio>(`${this.apiUrl}historicoLlamadas/readAllCambios/${id_historico}`);
  }
}
