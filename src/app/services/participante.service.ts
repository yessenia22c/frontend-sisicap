import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Persona, AllPersona, creaPersona, Ciudad, Pais, Sexo, AllCiudades, AllPaises, AllSexos } from '../models/persona';
import { HttpClient } from '@angular/common/http';
import { AllParticipante, AsignarNuevoParticipante, NuevoParticipante, Participante, PersonaNoParticipante } from '../models/participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;
  
constructor(private http: HttpClient) {}


  getParticipantes(): Observable<Participante>{
    return this.http.get<Participante>(`${this.apiUrl}participante/readAll`);
  }

  //Crear participantes
  crearParticipante(participante: NuevoParticipante): Observable<NuevoParticipante>{
    return this.http.post<NuevoParticipante>(`${this.apiUrl}participante/nuevo`, participante);
    console.log(participante);
  }
  actualizaParticipante(id_participante:number, modelo: NuevoParticipante): Observable<NuevoParticipante>{
    console.log(modelo);
    return this.http.put<NuevoParticipante>(`${this.apiUrl}participante/update`, modelo);
  }

  eliminarParticipante(id_participante:number): Observable<NuevoParticipante>{
    return this.http.delete<NuevoParticipante>(`${this.apiUrl}participante/delete/${id_participante}`);
  }

  //listar otros
  getListCiudad(): Observable<Ciudad>{
    return this.http.get<Ciudad>(`${this.apiUrl}ciudad/readAll`);
   
  }
  
  getPersonasNoParticipantes(): Observable<PersonaNoParticipante>{
    return this.http.get<PersonaNoParticipante>(`${this.apiUrl}participante/participantesAll`);
  }

  crearAsignarParticipante(participante: AsignarNuevoParticipante): Observable<AsignarNuevoParticipante>{
    return this.http.post<AsignarNuevoParticipante>(`${this.apiUrl}participante/create`, participante);
  }
}
