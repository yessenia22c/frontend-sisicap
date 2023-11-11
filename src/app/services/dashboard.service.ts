import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CiudadesParticipante } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;
  

  constructor(private http: HttpClient) { 
    
  }
  get ciudadesParticipantes(): Observable<CiudadesParticipante> {
    return this.http.get<CiudadesParticipante>(`${this.apiUrl}dashboard/ciudades`);
  }
}
