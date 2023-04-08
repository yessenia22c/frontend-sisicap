
import {LoginService} from './../services/login.service'
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  
  constructor( private router:Router  ) { 
    
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.agregaToken(req);
    return next.handle(req)
    // const token = `Bearer ${localStorage.getItem('access_token')}`
    // const headers = new HttpHeaders({Authorization:token}) 

    // const headersClone = req.clone({headers});
    // return next.handle(headersClone).pipe(
    //   catchError((err)=>{
    //     console.log(err);
    //     if ([401,403].indexOf(err.status)!== -1) {
    //       window.localStorage.removeItem('Credencial')
    //       this.router.navigate(['/login']);
    //     }
    //     const error=err.error.message||err.statusText;
    //     return throwError(err);
    //   }));
  }
  private agregaToken(request: HttpRequest<any>){
    const token = localStorage.getItem('access_token');
    if (token){
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`) 
      });
      return authReq;
    }
    return request
  }
}
