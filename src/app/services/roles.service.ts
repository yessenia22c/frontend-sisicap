import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NivelRoles } from '../models/nivelRoles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;
  constructor(
    private http: HttpClient
  ) { }
  getNivelRoles(): Observable<NivelRoles> {
    return this.http.get<NivelRoles>(`${this.apiUrl}nivelAcceso/readAll`);
  }
}
