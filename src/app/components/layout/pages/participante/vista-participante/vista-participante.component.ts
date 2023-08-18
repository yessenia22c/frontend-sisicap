import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatNavList, MatListModule } from '@angular/material/list';
import { Inscrito, ParticipantesInscritos } from 'src/app/models/capacitacion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vista-participante',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatListModule],
  templateUrl: './vista-participante.component.html',
  styleUrls: ['./vista-participante.component.css']
})
export class VistaParticipanteComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<VistaParticipanteComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public dataParticipante: Inscrito,
    ) {}
  
  ngOnInit(): void {
    this.dataParticipante
    console.log('INFO RECIBIDA DESDE EL GET', this.dataParticipante);
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
