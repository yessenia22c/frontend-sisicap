import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Tipo_usuarioService } from 'src/app/services/tipo_usuario.service';
import { Tipo_usuario } from 'src/app/models/tipo_usuario';
@Component({
  selector: 'app-dialog-eliminar-tipo-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-eliminar-tipo-usuario.component.html',
  styleUrls: ['./dialog-eliminar-tipo-usuario.component.css']
})
export class DialogEliminarTipoUsuarioComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataTipoUsuario: Tipo_usuario,
      public dialogReferencia: MatDialogRef<DialogEliminarTipoUsuarioComponent>
  ) { }

  confirmarDelete(){
    if(this.dataTipoUsuario){
      this.dialogReferencia.close("eliminar");
    }
  }
}
