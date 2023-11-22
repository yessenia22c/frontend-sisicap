import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint;
  

  constructor(private http: HttpClient) { 
    
  }
  get ciudadesParticipantes(): Observable<DataDashboard> {
    return this.http.get<DataDashboard>(`${this.apiUrl}dashboard/ciudades`);
  }
  get generoParticipantes(): Observable<DataDashboard> {
    return this.http.get<DataDashboard>(`${this.apiUrl}dashboard/sexo`);
  }
}
