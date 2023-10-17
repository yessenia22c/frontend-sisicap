import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ParticipanteService } from 'src/app/services/participante.service';
import { AllParticipante, Participante } from 'src/app/models/participante';
import { AllContacto } from 'src/app/models/contactoAsignar';
import { ServicioActualizarCrearContactoSeguimientoService } from 'src/app/services/servicioActualizarCrearContactoSeguimiento.service';
@Component({
  selector: 'app-dialog-eliminar-contacto',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  
  ],
  templateUrl: './dialog-eliminar-contacto.component.html',
  styleUrls: ['./dialog-eliminar-contacto.component.css']
})
export class DialogEliminarContactoComponent {
  constructor(
    
    private participanteService: ParticipanteService,
    @Inject(MAT_DIALOG_DATA) public dataContacto: AllContacto,
    private servicioContactoSeguimiento: ServicioActualizarCrearContactoSeguimientoService,
    public dialogReferencia: MatDialogRef<DialogEliminarContactoComponent>
  ){

  }
  ngOnInit(): void {

  }
  confirmarDelete(){
    if(this.dataContacto){
      this.dialogReferencia.close("eliminar");
      this.servicioContactoSeguimiento.actualizarContacto(this.dataContacto);

    }
  }
}
