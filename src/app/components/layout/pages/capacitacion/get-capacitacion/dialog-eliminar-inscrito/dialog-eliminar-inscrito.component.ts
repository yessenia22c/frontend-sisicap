import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { GetCapacitacion, Inscrito, UnaCapacitacion } from 'src/app/models/capacitacion';
@Component({
  selector: 'app-dialog-eliminar-inscrito',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-eliminar-inscrito.component.html',
  styleUrls: ['./dialog-eliminar-inscrito.component.css']
})
export class DialogEliminarInscritoComponent {
  constructor(
    private capacitacionService: CapacitacionService,
    @Inject(MAT_DIALOG_DATA) public dataParticipante: Inscrito,
      public dialogReferencia: MatDialogRef<DialogEliminarInscritoComponent>
  ) { }

  confirmarDelete(){
    if(this.dataParticipante){
      this.dialogReferencia.close("eliminar");
    }
  }
}
