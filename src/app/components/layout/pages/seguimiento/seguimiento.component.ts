import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoSeguimiento } from 'src/app/models/seguimiento';
import { Observable } from 'rxjs';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormGrupoSeguimientoComponent } from './form-grupo-seguimiento/form-grupo-seguimiento.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatDialogModule, MatIconModule, MatCardModule],
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export default class SeguimientoComponent implements OnInit {
    informacionSeguimiento$: Observable<GrupoSeguimiento>  |  undefined;
    constructor(public dialog: MatDialog) { }
    grupoSeguimientos = inject(SeguimientoService)
    listSeguimientos$: Observable<GrupoSeguimiento>  |  undefined;
    ngOnInit(): void {
      this.mostrarSeguimientos();
    }
    mostrarSeguimientos(){
      this.listSeguimientos$ = this.grupoSeguimientos.getGruposSeguimiento();
    }
    agregaSeguimiento() {
      this.dialog.open(FormGrupoSeguimientoComponent,{
        disableClose: true,
        width: '500px',
      }).afterClosed().subscribe(resultado => {
        if(resultado==="Creado"){
          this.mostrarSeguimientos();
        }
      })
    }
}
