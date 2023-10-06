import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contacto, ContactosAsignar, ContactosSubir, ListaContactoSubir } from '../models/contactoAsignar';
import { Observable } from 'rxjs';
import { CreaContacto, EstadoContactos } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;
  


  constructor(private http: HttpClient) { 
    
  }
  getContactos(): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}contacto/readAll`);
  }
  asignarContactos(modelo: ContactosAsignar): Observable<ContactosAsignar> {
    return this.http.post<ContactosAsignar>(`${this.apiUrl}historicoLlamadas/asignar`, modelo);
  };
  contactosSubir(modelo: ListaContactoSubir): Observable<ListaContactoSubir> {
    return this.http.post<ListaContactoSubir>(`${this.apiUrl}contacto/subir`, modelo);
  }

  crearContacto(modelo: CreaContacto): Observable<CreaContacto> {
    return this.http.post<CreaContacto>(`${this.apiUrl}contacto/create`, modelo);
  }

  listarEstadosContacto(): Observable<EstadoContactos> {
    return this.http.get<EstadoContactos>(`${this.apiUrl}estados/readAll`);
  }

  actualizarContacto(modelo: CreaContacto): Observable<CreaContacto> {
    return this.http.put<CreaContacto>(`${this.apiUrl}contacto/update`, modelo);
  }
  
}

