import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario_perfil } from '../models/PerfilUsuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "usuario/";
  private userId!: number ;

  constructor( private http: HttpClient, ) { 

     // Recuperar el valor de userIdLocal del almacenamiento local
     const userId = localStorage.getItem('usuarioId');
     if (userId) {
       this.userId = +userId; // Convertir la cadena en número
     }
  }
  
  
  setUserId(id: number) {
    this.userId = id;
    // Almacenar el valor de userIdLocal en el almacenamiento local
    localStorage.setItem('usuarioId', String(id));
  }
  //ESTE GET DEVUELVE EL VALOR QUE OBTIENE DEL SET CUANDO EL USUARIO SE LOGUEA
  getUserId() {   
    return this.userId;    
  }
  
  getUsuario(): Observable<Usuario_perfil>{
    const idUser = this.getUserId();
    console.log('DEL GET SE COMUNICA  CON LA API DE PERFIL SERVICE',idUser);
    console.log(this.http.get<Usuario_perfil>(`${this.apiUrl}read/${idUser}`));
    return this.http.get<Usuario_perfil>(`${this.apiUrl}read/${idUser}`)
  }
  
}
