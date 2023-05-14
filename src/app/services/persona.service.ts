import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Persona, AllPersona } from '../models/persona';
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

}
