import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Persona, AllPersona, creaPersona, Ciudad, Pais, Sexo, AllCiudades, AllPaises, AllSexos } from '../models/persona';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;
  
constructor(private http: HttpClient) {}


  getPersonas(): Observable<Persona>{
    return this.http.get<Persona>(`${this.apiUrl}persona/readAll`);
  }
  crearPersona(persona: creaPersona): Observable<creaPersona>{
    return this.http.post<creaPersona>(`${this.apiUrl}persona/create`, persona);
  }
  actualizaPersona(id_persona:number, modelo: creaPersona): Observable<creaPersona>{
    return this.http.put<creaPersona>(`${this.apiUrl}persona/update`, modelo);
  }


  //listar otros
  getListCiudad(): Observable<Ciudad>{
    return this.http.get<Ciudad>(`${this.apiUrl}ciudad/readAll`);
   
  }
  getListPais(): Observable<Pais>{
    return this.http.get<Pais>(`${this.apiUrl}pais/readAll`);
   
  }
  getListSexo(): Observable<Sexo>{
    return this.http.get<Sexo>(`${this.apiUrl}sexo/readAll`);
   
  }
}
