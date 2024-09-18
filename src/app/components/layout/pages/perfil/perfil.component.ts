import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { PerfilUsuario } from 'src/app/models/PerfilUsuario';
import { UnEmpleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export default class PerfilComponent implements OnInit {
  informacionUsuario: PerfilUsuario |  null = null ;
  informacionEmpleado: UnEmpleado |  null = null ;
  private perfilUsuario = inject(PerfilUsuarioService);
  private empeladoService = inject(EmpleadoService);
  ngOnInit(): void {
    //   this.authService.getProfile().subscribe(user => {
    //   this.authService.setAuthState(user);     
    //  });
    this.perfilUsuario.getUsuario().subscribe( async (data) => {
       this.informacionUsuario = await data;
      console.log(this.informacionUsuario);
      this.empeladoService.verEmpleado(this.informacionUsuario.usuario.empleado.id_empleado).subscribe((data) => {
        this.informacionEmpleado = data;
        console.log(this.informacionEmpleado);
      });
    });
  }
  onImageError(event: any) {
    event.target.src = '../../../../assets/img/defecto-usuario.png'; // Reemplaza con la ruta de tu imagen por defecto
  }
}
