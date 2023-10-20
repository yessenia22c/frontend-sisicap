import { Component, OnInit, inject } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { Usuario } from 'src/app/models/Usuarios';
import { Router } from '@angular/router';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { PerfilUsuario, TipoUsuarioAcceso } from 'src/app/models/PerfilUsuario';
import { RolesService } from 'src/app/services/roles.service';
import { Nivel } from 'src/app/models/nivelRoles';




@Component({
  selector: 'app-layout',
  templateUrl:'./layout.component.html' ,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{ 
  nivelRequerido = 8;
  
  currentScreenSize = '';
  orientation = '';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
    ['(orientation: portrait)', 'Portrait'],
    ['(orientation: landscape)', 'Landscape'],
  ]);

  constructor(  ){

  }
  panelOpenState = false;
  user: Usuario | null = null;
  informacionUsuario: PerfilUsuario |  null = null ;
  dataNiveles!: TipoUsuarioAcceso[] ;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(LoginService);
  private router = inject(Router);
  private perfilUsuario = inject(PerfilUsuarioService);
  private nivelService = inject(RolesService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]
    )
    .pipe(map(result => result.matches),shareReplay());

  
     
  ngOnInit(): void {
    //   this.authService.getProfile().subscribe(user => {
    //   this.authService.setAuthState(user);     
    //  });
    this.perfilUsuario.getUsuario().subscribe((data) => {
      this.informacionUsuario = data;
      this.dataNiveles = data.usuario.tipo_usuario.TipoUsuarioAcceso;
      //console.log('INFO USER suscribe',this.informacionUsuario);
      
    });
    // this.nivelService.getNivelRoles().subscribe((data) => {
      
    // });


    this.authService.authState$
    .subscribe(user => {
      this.user = user;
    });

    
    // this.perfilUsuario.getUsuario().pipe(tap((informacionUsuario: PerfilUsuario)=> {   
    //    this.informacionUsuario = informacionUsuario 
    //    console.log('INFO USER',this.informacionUsuario);
    //   })).subscribe();
  }
  isCollapsed: boolean = true;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    // cerrar el colapso al hacer clic en un enlace
   
   }

  // JavaScript para cerrar el colapso al hacer clic en otro enlace
  
  onImageError(event: any) {
    event.target.src = '../../../assets/img/defecto-usuario.png'; // Reemplaza con la ruta de tu imagen por defecto
  }

  logout() {
    this.authService.limpiarToken();
    this.router.navigate(['/login']);
  }

  


}
