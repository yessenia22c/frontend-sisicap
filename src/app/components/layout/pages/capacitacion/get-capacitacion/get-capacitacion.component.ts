import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitacion, CreaCapacitacion, EditarCapacitacion, GetCapacitacion, ParticipantesInscritos, UnaCapacitacion } from 'src/app/models/capacitacion';
import { Observable, catchError, finalize, of } from 'rxjs';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

//MATERIAL
import {MatGridListModule} from '@angular/material/grid-list';

import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { InscritosCapacitacionComponent } from '../inscritos-capacitacion/inscritos-capacitacion.component';
//FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@angular/flex-layout';
import { FormCapacitacionComponent } from '../form-capacitacion/form-capacitacion.component';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogInscribirParticipanteComponent } from '../dialog-inscribir-participante/dialog-inscribir-participante.component';

@Component({
  selector: 'app-get-capacitacion',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule, MatListModule,RouterModule,InscritosCapacitacionComponent, 
    FlexLayoutModule,
    GridModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './get-capacitacion.component.html',
  styleUrls: ['./get-capacitacion.component.css']
})
export default class GetCapacitacionComponent implements OnInit {
  public colSize=4;
  public cols= 3;
  public isMobile: boolean = false;
  reportePdf$ : Observable<Blob> | undefined;
  informacionCapacitacione$: Observable<GetCapacitacion>  |  undefined;
  informacionCap$: Observable<CreaCapacitacion>  |  undefined;
  informacionParticipante$: Observable<ParticipantesInscritos> | undefined;
  
  //tablaInscritos!: InscritosCapacitacionComponent ;
  constructor(private activatedRoute: ActivatedRoute, 
    private capacitacionService: CapacitacionService,
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
    ) {
      this.breakpointObserver.observe([
        Breakpoints.Handset
        
      ]).subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          
          this.colSize = 1;
          this.cols = 1;

        } else {
          this.colSize = 4 ;
          this.cols = 3;
        }
      });
     }
  
  capacitacion$: Observable<GetCapacitacion>  |  undefined;
  mylista$ = this.capacitacionService.listaTabla$;
  toggleGridColumns() {
    this.colSize = this.colSize === 2 ? 3 : 2;
  }
  ngOnInit(): void {
   this.verCapacitacion();
   //this.tablaInscritos = new InscritosCapacitacionComponent();
    // if (id_capacitacion) {
         
    //   //console.log('CAPACITACION',this.capacitacion$);
    // }
  }
  verCapacitacion(){
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];

    this.capacitacion$ = this.capacitacionService.getCapacitacion(id_capacitacion);
      this.capacitacion$.pipe(
        tap((data: GetCapacitacion) => {
          
          console.log('CAPACITACION',data);
        }
      ),catchError((err) => {
        console.log('ERROR',err);
        return of([]);
      })
      ).subscribe(); 
  }

  //Ccd .Ompletar editar capacitacion
  editarCapacitacion(dataCapacitacion: GetCapacitacion) {  
    this.dialog.open(FormCapacitacionComponent,{
      disableClose: true,
      width: '400px',
      data: dataCapacitacion
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.verCapacitacion();
      }
    })
    
  }
  verReporte(){
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];
    this.reportePdf$ = this.capacitacionService.getReportePdf(id_capacitacion);
    this.reportePdf$.subscribe(
      (data:Blob) => {
        const linkBack = URL.createObjectURL(data);
        window.open(linkBack, '_blank');
      }
    );
    
  }
  actualizaDataTablaInscritos(){
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];

    this.informacionParticipante$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion);

    this.informacionParticipante$.subscribe({
      next: (resp: ParticipantesInscritos) => {
        console.log('RESP',resp);
        this.capacitacionService.actualizarTabla(resp.inscritos);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  }
  inscribirParticipante(){
    this.dialog.open(DialogInscribirParticipanteComponent,
      {
        disableClose: true,
        width: '600px',
        data:{id_capacitacion: this.activatedRoute.snapshot.params['id_capacitacion']}

      }).afterClosed().subscribe(resultado => {
        if(resultado==="Creado"){
          this.actualizaDataTablaInscritos();
          //const id_capacitacion =  this.activatedRoute.snapshot.params['id_capacitacion']
          //this.tablaInscritos.mostrarParticipantes();
          //this.informacionParticipante$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion);
        }
      });


  }

}

