import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ParticipanteService } from 'src/app/services/participante.service';
import { AllParticipante, Participante } from 'src/app/models/participante';
@Component({
  selector: 'app-dialogo-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {
  constructor(
    
    private participanteService: ParticipanteService,
    @Inject(MAT_DIALOG_DATA) public dataParticipante: AllParticipante,
    public dialogReferencia: MatDialogRef<DialogoDeleteComponent>
  ){

  }
  ngOnInit(): void {

  }
  confirmarDelete(){
    if(this.dataParticipante){
      this.dialogReferencia.close("eliminar");
    }
  }
}
