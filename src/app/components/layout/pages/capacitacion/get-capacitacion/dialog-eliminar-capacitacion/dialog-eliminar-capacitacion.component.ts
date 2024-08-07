import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { GetCapacitacion, UnaCapacitacion } from 'src/app/models/capacitacion';
@Component({
  selector: 'app-dialog-eliminar-capacitacion',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule

  ],
  templateUrl: './dialog-eliminar-capacitacion.component.html',
  styleUrls: ['./dialog-eliminar-capacitacion.component.css']
})
export class DialogEliminarCapacitacionComponent {
  constructor(
    private capacitacionService: CapacitacionService,
    @Inject(MAT_DIALOG_DATA) public dataCapacitacion: GetCapacitacion,
      public dialogReferencia: MatDialogRef<DialogEliminarCapacitacionComponent>
  ) { }

  confirmarDelete(){
    if(this.dataCapacitacion){
      this.dialogReferencia.close("eliminar");
    }
  }
}
