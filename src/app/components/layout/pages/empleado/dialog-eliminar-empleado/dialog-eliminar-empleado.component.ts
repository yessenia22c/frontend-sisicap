import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ParticipanteService } from 'src/app/services/participante.service';
import { AllParticipante, Participante } from 'src/app/models/participante';
import { EmpleadoList } from 'src/app/models/empleado';

@Component({
  selector: 'app-dialog-eliminar-empleado',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dialog-eliminar-empleado.component.html',
  styleUrls: ['./dialog-eliminar-empleado.component.css']
})
export class DialogEliminarEmpleadoComponent implements OnInit {
  constructor(

    @Inject(MAT_DIALOG_DATA) public dataEmpleado: EmpleadoList,
    public dialogReferencia: MatDialogRef<DialogEliminarEmpleadoComponent>
  ){

  }
  ngOnInit(): void {

  }
  confirmarDelete(){
    if(this.dataEmpleado){
      this.dialogReferencia.close("eliminar");
    }
  }
}
