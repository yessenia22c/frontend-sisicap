import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { GetCapacitacion, UnaCapacitacion } from 'src/app/models/capacitacion';
@Component({
  selector: 'app-dialog-dar-baja-capacitacion',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-dar-baja-capacitacion.component.html',
  styleUrls: ['./dialog-dar-baja-capacitacion.component.css']
})
export class DialogDarBajaCapacitacionComponent {
  constructor(
    private capacitacionService: CapacitacionService,
    @Inject(MAT_DIALOG_DATA) public dataCapacitacion: GetCapacitacion,
      public dialogReferencia: MatDialogRef<DialogDarBajaCapacitacionComponent>
  ) { }

  confirmarBaja(){
    if(this.dataCapacitacion){
      if(this.dataCapacitacion.UnaCapacitacion.vigente == true){
        this.dialogReferencia.close("baja");

      }else{
        this.dialogReferencia.close("vigente");
      }
    }
  }

}
