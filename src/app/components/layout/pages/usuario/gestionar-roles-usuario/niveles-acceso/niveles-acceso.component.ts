import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { AllAcceso, AsignarNivelesAcceso, Niveles, NivelesAccesosTipoUsuario, TipoUsuarioList, Tipo_usuario, UnTipoUsuario } from 'src/app/models/tipo_usuario';
import { Tipo_usuarioService } from 'src/app/services/tipo_usuario.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NivelAcceso } from 'src/app/models/PerfilUsuario';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-niveles-acceso',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './niveles-acceso.component.html',
  styleUrls: ['./niveles-acceso.component.css']
})
export default class NivelesAccesoComponent implements OnInit {
  informacionNiveles$: Observable<Niveles> | undefined;
  informacionTipoUsuario$: Observable<UnTipoUsuario> | undefined;
  informacionTipoUsuarioAccesos$: Observable<TipoUsuarioList> | undefined;
  datoTipoUsuarioNiveles: AllAcceso[] = [];

  asignarNivelesAcceso$: Observable<AsignarNivelesAcceso> | undefined;
  informacionNivelesAccessoTU$: Observable<NivelesAccesosTipoUsuario> | undefined;
  selectedCheckboxes: boolean[] = [];
  listaNiveles: NivelAcceso[] = [];

  //pruebas
  // IdNivelesSeleccionado: any[] = [];
  // listaIdNiveles: any[] = [];
  id_tipo_usuario = this.activatedRoute.snapshot.params['id_tipo_usuario'];
  seleccionarTodos: boolean = false;
  selection = new SelectionModel<NivelAcceso>(true, []);
  constructor(
    private activatedRoute: ActivatedRoute,
    private tipoUsaurioService: Tipo_usuarioService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    

    
    
    
    //Fin niveles de acceso para un tipo de usuario

    this.informacionTipoUsuario$ = this.tipoUsaurioService.getUnTipoUsuario(this.id_tipo_usuario);
    this.informacionTipoUsuario$.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    }); // Para que se ejecute la petición
    this.mostrarNiveles();
    //this.mostrarNivelesDeAcceso();

    // this.mostrarNivelesDeAcceso();
    // this.recorrerNiveles();
  }

  
  mostrarNiveles(){
    this.informacionNiveles$ = this.tipoUsaurioService.getNivelesAcceso();
    this.informacionNiveles$.subscribe({
      next: (data) => {
        this.listaNiveles = data.nivelAcceso;
        this.mostrarNivelesDeAcceso();
        //console.log(data.nivelAcceso);
      },
      error: (error) => {
        console.log(error);
      }
    })
    //this.mostrarNivelesDeAcceso();
  }
  mostrarNivelesDeAcceso(){
    //niveles de acceso para un tipo de usuario
    this.informacionNivelesAccessoTU$ = this.tipoUsaurioService.getNivelesAccesoTipoUsuario(this.id_tipo_usuario);
    this.informacionNivelesAccessoTU$.subscribe({
      next: (data) => {
        this.datoTipoUsuarioNiveles = data.AllAccesos;
        //console.log('NIVELES accesO',data.AllAccesos);
        this.recorrerNiveles(this.datoTipoUsuarioNiveles);
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
  recorrerNiveles(NivelesConAcceso: AllAcceso[]){
    console.log('NIVELES CON ACCESO',NivelesConAcceso);
    console.log('LISTA DE NIVELES',this.listaNiveles);
    this.listaNiveles.forEach((element:NivelAcceso) => {
      NivelesConAcceso.forEach((element2:AllAcceso) => {
        if(element.id_nivel === element2.NivelAcceso.id_nivel){
          this.selection.select(element);
        }
      });
      
    });
    
  }

  //PARA SELECCIONAR TODOS LOS CHECKBOX


  get allSelected(): boolean {
    return (
      !!this.listaNiveles.length &&
      this.selection.selected.length === this.listaNiveles.length
    );
  }

  toggleSelection(){
    if(this.allSelected){
      this.selection.clear();
      
  }else{
    this.selection.select(...this.listaNiveles);
  }}
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000

    });
  }
  crearNivelesAcceso(){
    const modelo: AsignarNivelesAcceso = {
      id_tipo_usuario: parseInt(this.id_tipo_usuario),
      niveles: this.selection.selected
    }
    console.log('MODELO NIVELES DE ACCESO',modelo);
    this.asignarNivelesAcceso$ = this.tipoUsaurioService.asignarNivelesAcceso(modelo);
    this.asignarNivelesAcceso$.subscribe({
      next: (data) => {
        this.mostrarAlerta('Niveles de acceso del tipo de usuario actualizados', 'Listo');
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        console.log(data);
      },
      error: (error) => {
        this.mostrarAlerta('Error al guardar los cambios', 'Listo');
        console.log(error);
      }
    });
  }
  

}
