import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, map } from 'rxjs';
import { Capacitacion, CreaCapacitacion, EditarCapacitacion, GetCapacitacion, Participante, ParticipantesInscritos, ParticipantesNoInscritos, UnaCapacitacion } from '../models/capacitacion';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;

  constructor(private http: HttpClient) { 
    
  }


  getCapacitaciones(): Observable<Capacitacion> {
    return this.http.get<Capacitacion>(`${this.apiUrl}capacitacion/readAll`);
  }
  getCapacitacion(id_capacitacion: number): Observable<GetCapacitacion> {
    
    return this.http.get<GetCapacitacion>(`${this.apiUrl}capacitacion/read/${id_capacitacion}`);
  }
  editarCapacitacion(id_capacitacion: number, modelo: CreaCapacitacion): Observable<CreaCapacitacion> {
    return this.http.put<CreaCapacitacion>(`${this.apiUrl}capacitacion/update/`, modelo);
  }

  crearCapacitacion(capacitacion: CreaCapacitacion): Observable<CreaCapacitacion> {
    return this.http.post<CreaCapacitacion>(`${this.apiUrl}capacitacion/create`, capacitacion);
  }
  actualizarCapacitacion(id_capacitacion: number, capacitacion: Capacitacion): Observable<Capacitacion> {
    return this.http.put<Capacitacion>(`${this.apiUrl}capacitacion/update/${id_capacitacion}`, capacitacion);
  }
  eliminarCapacitacion(id_capacitacion: number, capacitacion: Capacitacion): Observable<Capacitacion> {
    return this.http.put<Capacitacion>(`${this.apiUrl}capacitacion/delete/${id_capacitacion}`, capacitacion);

  }
  ///Inscritos Capacitacion


  getInscritosCapacitacion(id_capacitacion: number): Observable<ParticipantesInscritos> {
    return this.http.get<ParticipantesInscritos>(`${this.apiUrl}participantes/inscritos/${id_capacitacion}`);
  }

  getReportePdf(id_capacitacion: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}reporte/inscritos/pdf/${id_capacitacion}`, { responseType: 'blob' })
    .pipe(
      map((response: any) => response as Blob)
    );
  }

  getParticipantesNoInscrtios(id_capacitacion: number): Observable<ParticipantesNoInscritos> {
    return this.http.get<ParticipantesNoInscritos>(`${this.apiUrl}participantes/disponibles/${id_capacitacion}`);
  }
}

