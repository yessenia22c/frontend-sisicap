import { Component, OnInit, inject } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { Usuario } from 'src/app/models/Usuarios';
import { Router } from '@angular/router';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { PerfilUsuario } from 'src/app/models/PerfilUsuario';
@Component({
  selector: 'app-dashboard',
  templateUrl:'./layout.component.html' ,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{ 
  constructor(  ){

  }
  user: Usuario | null = null;
  informacionUsuario: PerfilUsuario |  null = null ;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(LoginService);
  private router = inject(Router);
  private perfilUsuario = inject(PerfilUsuarioService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),shareReplay());


     
  ngOnInit(): void {
    //   this.authService.getProfile().subscribe(user => {
    //   this.authService.setAuthState(user);     
    //  });
    this.perfilUsuario.getUsuario().subscribe((data) => {
      this.informacionUsuario = data;
      //console.log('INFO USER suscribe',this.informacionUsuario);
      
    });


    this.authService.authState$
    .subscribe(user => {
      this.user = user;
    });

    
    // this.perfilUsuario.getUsuario().pipe(tap((informacionUsuario: PerfilUsuario)=> {   
    //    this.informacionUsuario = informacionUsuario 
    //    console.log('INFO USER',this.informacionUsuario);
    //   })).subscribe();
  }

  logout() {
    this.authService.limpiarToken();
    this.router.navigate(['/login']);
  }

  


}
