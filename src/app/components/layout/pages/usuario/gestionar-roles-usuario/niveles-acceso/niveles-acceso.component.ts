import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { Niveles, TipoUsuarioList, Tipo_usuario, UnTipoUsuario } from 'src/app/models/tipo_usuario';
import { Tipo_usuarioService } from 'src/app/services/tipo_usuario.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-niveles-acceso',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './niveles-acceso.component.html',
  styleUrls: ['./niveles-acceso.component.css']
})
export default class NivelesAccesoComponent implements OnInit {
  informacionNiveles$: Observable<Niveles> | undefined;
  informacionTipoUsuario$: Observable<UnTipoUsuario> | undefined;
  informacionTipoUsuarioAccesos$: Observable<TipoUsuarioList> | undefined;
  selectedCheckboxes: boolean[] = [];
  seleccionarTodos: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tipoUsaurioService: Tipo_usuarioService,
  ) { }
  ngOnInit(): void {
    const id_tipo_usuario = this.activatedRoute.snapshot.params['id_tipo_usuario'];
    this.informacionTipoUsuario$ = this.tipoUsaurioService.getUnTipoUsuario(id_tipo_usuario);
    this.informacionTipoUsuario$.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    }); // Para que se ejecute la petición
    this.mostrarNiveles();
  }
  mostrarNiveles(){
    this.informacionNiveles$ = this.tipoUsaurioService.getNivelesAcceso();
    this.informacionNiveles$.subscribe({
      next: (data) => {
        console.log(data.nivelAcceso);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  seleccionarTodosNiveles(){
    this.seleccionarTodos = !this.seleccionarTodos;
    console.log(this.selectedCheckboxes);
  }

  
}
