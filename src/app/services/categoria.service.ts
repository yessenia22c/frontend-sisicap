import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint ;

constructor(private http: HttpClient) { }

getListCategoria(): Observable<Categoria>{
  return this.http.get<Categoria>(`${this.apiUrl}categoria/readAll`);
 
}

}
