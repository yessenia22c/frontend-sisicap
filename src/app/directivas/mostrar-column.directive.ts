import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { PerfilUsuario, TipoUsuarioAcceso, Usuario } from '../models/PerfilUsuario';
import { PerfilUsuarioService } from '../services/perfil-usuario.service';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { AccesoEvento } from '../models/AccesoEvento';

@Directive({
  selector: '[appMostrarColumn]',
  standalone: true,
})


export class MostrarColumnDirective implements OnInit{ 

  private usuarioActual!: Usuario;
  private perfilActual: Observable<PerfilUsuario> | null = null;

  @Input('appMostrarColumn') nivelRequerido!: number;
  @Output() accesoDeterminado = new EventEmitter<boolean>() ;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private perfilUsuarioService: PerfilUsuarioService,
    private nivelService: RolesService
  ) {}

  ngOnInit(): void {
    this.perfilActual = this.perfilUsuarioService.getUsuario();
    // this.accesoDeterminado.subscribe({
    //   next: (evento: AccesoEvento) => {
    //     console.log('Evento YESS:', evento);
    //   }
    // }); // Initialize the event emitter
    this.perfilActual.subscribe({
      next: (usuario: PerfilUsuario) => {
        this.usuarioActual = usuario.usuario;
        const tieneAcceso = this.tieneAcceso();
        console.log('Tiene acceso:', tieneAcceso);
        this.accesoDeterminado.emit(tieneAcceso);
        // console.log('Emitiendo:', this.accesoDeterminado);
        this.actualizarVista(tieneAcceso);
      }
    });
  }

  private tieneAcceso(): boolean {
    if (this.usuarioActual && this.usuarioActual.tipo_usuario.TipoUsuarioAcceso) {
      return this.usuarioActual.tipo_usuario.TipoUsuarioAcceso.some(acceso => acceso.id_nivel === Number(this.nivelRequerido));
    }
    return false;
  }

  private actualizarVista(tieneAcceso: boolean): void {
    if (tieneAcceso) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  
}
