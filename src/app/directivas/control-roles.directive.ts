import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { PerfilUsuario, TipoUsuarioAcceso, Usuario } from '../models/PerfilUsuario';
import { PerfilUsuarioService } from '../services/perfil-usuario.service';
import { Observable } from 'rxjs';
import { Nivel, NivelRoles } from '../models/nivelRoles';
import { RolesService } from '../services/roles.service';

@Directive({
  standalone: true,
  selector: '[appControlRoles]'
})
export class ControlRolesDirective implements OnInit {
  private usuarioActual!: Usuario;

  PerfilActual: Observable<PerfilUsuario> |  null = null 
  nivelesDisponibles: Observable<NivelRoles> |  null = null 


  private permisos!: TipoUsuarioAcceso[] ;
  private nivelService = inject(RolesService);  
  dataNiveles!: Nivel[] ;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private perfilUsuarioService: PerfilUsuarioService,
  ) { }

  ngOnInit(): void {
    this.PerfilActual = this.perfilUsuarioService.getUsuario()
    this.PerfilActual.subscribe({
      next: (usuario: PerfilUsuario) => {
        this.usuarioActual = usuario.usuario
        //console.log('NG-USAER ACT',this.usuarioActual)
        if (this.tieneAcceso()) {
          //console.log('TIENE ACCESO')
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          //console.log('RESPONDE FALSE')
          this.viewContainer.clear();
        }
      }
    })

    // this.nivelesDisponibles = this.nivelService.getNivelRoles()
    // this.nivelesDisponibles.subscribe({
    //   next: (niveles: NivelRoles) => {
    //     this.dataNiveles = niveles.nivelAcceso
    //     console.log('NG-NIVELES',this.dataNiveles)
    //   }
    // });

    
  }
  @Input('appControlRoles') nivelRequerido!: number;
  
  private tieneAcceso(): boolean {
    //console.log('TIENE ACCESO',this.usuarioActual)
    if (this.usuarioActual && this.usuarioActual.tipo_usuario.TipoUsuarioAcceso) {
      //console.log('Entra al IF ')
      return this.usuarioActual.tipo_usuario.TipoUsuarioAcceso.some(acceso => {
        //aseguro que this.nivelRequerido sea un numero
        this.nivelRequerido = Number(this.nivelRequerido);
        //console.log('ID_nivel_tipoUsarioAcceso', acceso.id_nivel, 'ID mandado por el html ', this.nivelRequerido);
         return acceso.id_nivel === this.nivelRequerido
      });
    }
    //console.log('Se sata aqui')
    return false;
  }
  // set appControlRoles(val: TipoUsuarioAcceso[]) {
  //   //this.viewContainer.createEmbeddedView(this.templateRef);
  //   this.permisos = val
  //   this.actualizaView();
  // }
  // private actualizaView(): void {
  //   this.viewContainer.clear();
  //   if (this.revisarPermisos()){
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   }
    
  // }
  // private revisarPermisos(): boolean {
  //   let tienePermiso = false;
  //   if (this.usuarioActual && this.usuarioActual.tipo_usuario.TipoUsuarioAcceso){
  //     console.log('Aqui entra')
  //     for(const checarPermiso of this.permisos){

  //       //reccorro los permisos

  //       const encontrarPermsio = this.dataNiveles.find((permiso: Nivel) => {
  //         console.log(permiso.id_nivel, checarPermiso.id_nivel);
  //         return (permiso.id_nivel === checarPermiso.id_nivel)
  //       })

  //       if ( encontrarPermsio ){
  //         console.log('ENCONTRE PERMISO', encontrarPermsio);
  //         tienePermiso = true
  //         break;
  //       }
  //     }
  //    }
  //    console.log(this.dataNiveles)
  //    console.log(tienePermiso);
  //    return tienePermiso;
    
  // }
}
