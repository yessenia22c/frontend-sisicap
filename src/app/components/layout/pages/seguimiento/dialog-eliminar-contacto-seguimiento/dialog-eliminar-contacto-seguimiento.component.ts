import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ParticipanteService } from 'src/app/services/participante.service';
import { AllParticipante, Participante } from 'src/app/models/participante';
import { AllContacto } from 'src/app/models/contactoAsignar';
import { ServicioActualizarCrearContactoSeguimientoService } from 'src/app/services/servicioActualizarCrearContactoSeguimiento.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { InformacionContacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-dialog-eliminar-contacto-seguimiento',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dialog-eliminar-contacto-seguimiento.component.html',
  styleUrls: ['./dialog-eliminar-contacto-seguimiento.component.css']
})
export class DialogEliminarContactoSeguimientoComponent {
  constructor(
    
    private participanteService: ParticipanteService,
    @Inject(MAT_DIALOG_DATA) public dataContacto: InformacionContacto,
    private servicioContactoSeguimiento: SeguimientoService,
    public dialogReferencia: MatDialogRef<DialogEliminarContactoSeguimientoComponent>
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
