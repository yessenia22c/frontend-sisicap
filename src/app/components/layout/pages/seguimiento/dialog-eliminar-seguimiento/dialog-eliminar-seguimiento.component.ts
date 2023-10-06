import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { GetSeguimiento } from 'src/app/models/seguimiento';

@Component({
  selector: 'app-dialog-eliminar-seguimiento',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog-eliminar-seguimiento.component.html',
  styleUrls: ['./dialog-eliminar-seguimiento.component.css']
})
export class DialogEliminarSeguimientoComponent {
  constructor(
    private seguimientoService: SeguimientoService,
    @Inject(MAT_DIALOG_DATA) public dataGrupoSeguimiento: GetSeguimiento,
      public dialogReferencia: MatDialogRef<DialogEliminarSeguimientoComponent>
  ) { }

  confirmarDelete(){
    if(this.dataGrupoSeguimiento){
      this.dialogReferencia.close("eliminar");
    }
  }
}
