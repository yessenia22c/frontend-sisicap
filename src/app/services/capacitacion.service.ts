import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable, forkJoin, map, of, tap } from 'rxjs';
import { Capacitacion, CreaCapacitacion, EditarCapacitacion, GetCapacitacion, Inscripciones, Inscrito, ListaInscripcion, Participante, ParticipantesInscritos, ParticipantesNoInscritos, UnaCapacitacion } from '../models/capacitacion';
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
  eliminarCapacitacion(id_capacitacion: number ): Observable<Capacitacion> {
    return this.http.delete<Capacitacion>(`${this.apiUrl}capacitacion/delete/${id_capacitacion}`);

  }
  eliminarParticipanteInscrito(id_inscripcion: number): Observable<Inscrito> {
    return this.http.delete<Inscrito>(`${this.apiUrl}capacitacion/eliminarInscripcion/${id_inscripcion}`); 
  }

  noVigenteCapaciatcion(id_capacitacion: number): Observable<Capacitacion> {
    return this.http.put<Capacitacion>(`${this.apiUrl}capacitacion/vigente/${id_capacitacion}`, null);
  }

  private listaTabla!: ParticipantesInscritos;
  private listaTablaSubject = new BehaviorSubject<ParticipantesInscritos>({} as ParticipantesInscritos);
  public listaTabla$ = this.listaTablaSubject.asObservable();

  informacionParticipante$: Observable<ParticipantesInscritos> | undefined;

  private inscripcionActualizadosSubject = new BehaviorSubject<ParticipantesInscritos>({} as ParticipantesInscritos);
  public inscripcionActualizados$ = this.inscripcionActualizadosSubject.asObservable();
  ///Inscritos Capacitacion
  // actualizarTabla(lista: ParticipantesInscritos): void {
  //   this.listaTablaSubject.next(lista.inscritos);
  // }


  getInscritosCapacitacion(id_capacitacion: number): Observable<ParticipantesInscritos> {
    return this.http.get<ParticipantesInscritos>(`${this.apiUrl}participantes/inscritos/${id_capacitacion}`).pipe(
      tap((lista: ParticipantesInscritos) => {
        this.listaTabla = lista;
        this.listaTablaSubject.next(this.listaTabla);
      })
    );
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


  agregarInscritosCapacitacion(listaParticipantes: ListaInscripcion): Observable<ListaInscripcion> {
    return this.http.post<ListaInscripcion>(`${this.apiUrl}capacitacion/participantes/nuevos/`, listaParticipantes );
  }

  

  // agregarInscritosCapacitacion(listaParticipantes: ListaInscripcion): Observable<ListaInscripcion> {
  //   listaParticipantes.inscripciones.map((inscripcion: Inscripciones) => {
  //     this.informacionParticipante$ = this.getInscritosCapacitacion(inscripcion.id_capacitacion).pipe(
  //       tap((lista: ParticipantesInscritos) => {
  //         this.listaTabla = lista;
  //         this.listaTablaSubject.next(this.listaTabla);
  //       })
  //     );
  //   });
    
  //   return this.http.post<ListaInscripcion>(`${this.apiUrl}capacitacion/participantes/nuevos/`, listaParticipantes );
 
  // }
}

