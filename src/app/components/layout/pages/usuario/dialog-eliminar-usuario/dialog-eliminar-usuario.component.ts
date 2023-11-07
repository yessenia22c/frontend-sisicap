import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioList } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-dialog-eliminar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dialog-eliminar-usuario.component.html',
  styleUrls: ['./dialog-eliminar-usuario.component.css']
})
export class DialogEliminarUsuarioComponent implements OnInit {
  constructor(

    @Inject(MAT_DIALOG_DATA) public dataUsuario: UsuarioList,
    public dialogReferencia: MatDialogRef<DialogEliminarUsuarioComponent>
  ){

  }
  ngOnInit(): void {

  }
  confirmarDelete(){
    if(this.dataUsuario){
      this.dialogReferencia.close("eliminar");
    }
  }
}
