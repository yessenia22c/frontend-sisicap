import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoSeguimiento, UnGrupoSeguimiento } from 'src/app/models/seguimiento';
import { Observable } from 'rxjs';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormGrupoSeguimientoComponent } from './form-grupo-seguimiento/form-grupo-seguimiento.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlRolesDirective } from 'src/app/directivas/control-roles.directive';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule,
     MatButtonModule, 
     RouterModule, 
     MatDialogModule, 
     MatIconModule, 
     MatCardModule, 
     MatFormFieldModule, 
     MatInputModule,
     ControlRolesDirective
    ],
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export default class SeguimientoComponent implements OnInit {
    informacionSeguimiento$: Observable<GrupoSeguimiento>  |  undefined;
    constructor(public dialog: MatDialog) { }
    grupoSeguimientos = inject(SeguimientoService)
    listSeguimientos$: Observable<GrupoSeguimiento>  |  undefined;
    SegumientosLista: UnGrupoSeguimiento[] = [];

    
    filtrados: UnGrupoSeguimiento[] = [];
    @ViewChild('cardContainer') cardContainer!: ElementRef;

    ngOnInit(): void {
      this.mostrarSeguimientos();

    }
    mostrarSeguimientos(){
      this.listSeguimientos$ = this.grupoSeguimientos.getGruposSeguimiento();

      this.listSeguimientos$.subscribe((data) => {
        this.SegumientosLista = data.UnGrupoSeguimiento;
        this.filtrados = data.UnGrupoSeguimiento;
      });
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('filterValue',filterValue);
    if (!filterValue) {
      this.filtrados = this.SegumientosLista ;
      return;
    }
    this.filtrados = this.filtrados.filter(item =>item.nombre_seguimiento.toLowerCase().includes(filterValue) || 
    item.Empleado.PersonaEmpleado.nombres_per.toLowerCase().includes(filterValue) || item.Capacitacion.nombre_capacitacion.toLowerCase().includes(filterValue));
    console.log('filtrados lista',this.SegumientosLista.filter(item =>item.nombre_seguimiento.toLowerCase().includes(filterValue)));     
  }
    

  // applyFilter(event: Event) {
  //   // const filterValue = (event.target as HTMLInputElement).value;
  //   // this.SegumientosLista.filter. = filterValue.trim().toLowerCase();

  //   const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.searchCards(filterValue);
  // }
  
  // searchCards(filterValue: string) {
    
  //   if(filterValue.length > 0){
  //     const cards = document.querySelectorAll('.carta');
  //     cards.forEach((card: any) => {
  //       card.textContent.toLowerCase().includes(filterValue)
  //       ?card.classList.remove('filter'):card.classList.add('filter');
  //     });

      
  //   }else{
  //     const cards = document.querySelectorAll('.carta');
  //     cards.forEach((card: any) => {
  //       card.classList.remove('filter');
  //     });
  //   }
    
  //   //   const cardTitle = card.querySelector('.col-sm-3')?.textContent?.toLowerCase();
  //   //   if (cardTitle?.includes(filterValue)) {
  //   //     card.style.display = 'block';
  //   //   } else {
  //   //     card.style.display = 'none';
  //   //   }
  //   // });
  // }
}
