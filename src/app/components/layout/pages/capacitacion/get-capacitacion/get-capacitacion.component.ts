import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitacion, CreaCapacitacion, EditarCapacitacion, GetCapacitacion, Inscrito, ParticipantesInscritos, UnaCapacitacion } from 'src/app/models/capacitacion';
import { Observable, catchError, finalize, of } from 'rxjs';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

//MATERIAL
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheet, MatBottomSheetRef, MatBottomSheetModule} from '@angular/material/bottom-sheet';

import { InscritosCapacitacionComponent } from '../inscritos-capacitacion/inscritos-capacitacion.component';

//FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@angular/flex-layout';
import { FormCapacitacionComponent } from '../form-capacitacion/form-capacitacion.component';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogInscribirParticipanteComponent } from '../dialog-inscribir-participante/dialog-inscribir-participante.component';
import { AllParticipante, NuevoParticipante, Participante } from 'src/app/models/participante';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ParticipanteService } from 'src/app/services/participante.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormParticipanteAddEditComponent } from '../../participante/form-participante-add-edit/form-participante-add-edit.component';
import { VistaParticipanteComponent } from '../../participante/vista-participante/vista-participante.component';
import { DialogEliminarCapacitacionComponent } from './dialog-eliminar-capacitacion/dialog-eliminar-capacitacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogEliminarInscritoComponent } from './dialog-eliminar-inscrito/dialog-eliminar-inscrito.component';
import { DialogDarBajaCapacitacionComponent } from './dialog-dar-baja-capacitacion/dialog-dar-baja-capacitacion.component';

@Component({
  selector: 'app-get-capacitacion',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule, MatListModule,RouterModule,InscritosCapacitacionComponent, 
    FlexLayoutModule,
    GridModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatBottomSheetModule
    
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
  //informacionParticipante$: Observable<ParticipantesInscritos> | undefined;

  //CÓDIGO DE LA TABLA

  options: AllParticipante[] = [];
  filteredOptions!: Observable<AllParticipante[]> ;
  listParticipantes$: Observable<Participante> | undefined;
  
  displayedColumns: string[] = ['id_participante', 'nombres_per', 'apellidos', 'nro_ci', 'codigo_participante','ocupacion', 'id_usuario', 'accion'];
  informacionParticipante$: Observable<ParticipantesInscritos> | undefined;
  filterValue = '';
  dataSource = new  MatTableDataSource<Inscrito>();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  
  
  participantesService = inject(ParticipanteService);

  
  
  //tablaInscritos!: InscritosCapacitacionComponent ;
  constructor(private activatedRoute: ActivatedRoute, 
    private capacitacionService: CapacitacionService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
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


      //codigo de la tabla
        this.listParticipantes$ = this.participantesService.getParticipantes();
        this.listParticipantes$.subscribe({
        next: (data: Participante) => {
          const participantes = data;
          this.options = data.AllParticipantes;
        },
        error: (error: any) => {
          console.log(error);
        }
        });
 }
  
  capacitacion$: Observable<GetCapacitacion>  |  undefined;
  listTabla$: Observable<ParticipantesInscritos> | undefined;
  
  //componeteInscritos = new InscritosCapacitacionComponent();
  toggleGridColumns() {
    this.colSize = this.colSize === 2 ? 3 : 2;
  }
  ngOnInit(): void {
    this.mostrarParticipantes();
    this.verCapacitacion();

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
  darBajaCapacitacion(dataCapacitacion: GetCapacitacion) {
    this.dialog.open(DialogDarBajaCapacitacionComponent,{
      disableClose: true,
      width: '400px',
      data: dataCapacitacion
    }).afterClosed().subscribe(resultado => {
      if(resultado==="baja"){
        this.capacitacionService.noVigenteCapaciatcion(dataCapacitacion.UnaCapacitacion.id_capacitacion).subscribe({
          next: (data) => {
            console.log(data);
            this.mostrarAlerta('Capacitación cambiada a NO VIGENTE','cerrar');
            this.route.navigate(['../../'], { relativeTo: this.activatedRoute });
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta('Error al dar de baja','cerrar');
          }
        });
        
      }else{
        if(resultado=='vigente'){
          this.capacitacionService.noVigenteCapaciatcion(dataCapacitacion.UnaCapacitacion.id_capacitacion).subscribe({
            next: (data) => {
              console.log(data);
              this.mostrarAlerta('Capacitación cambiada a VIGENTE','cerrar');
              this.route.navigate(['../../'], { relativeTo: this.activatedRoute });
            },
            error: (error) => {
              console.log(error);
              this.mostrarAlerta('Error al poner Vigente','cerrar');
            }
          });
        }
      }
    })
  }
  eliminarCapacitacion(dataCapacitacion: GetCapacitacion) {  
    this.dialog.open(DialogEliminarCapacitacionComponent,{
      disableClose: true,
      width: '400px',
      data: dataCapacitacion
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.capacitacionService.eliminarCapacitacion(dataCapacitacion.UnaCapacitacion.id_capacitacion).subscribe({
          next: (data) => {
            console.log(data);
            this.mostrarAlerta('Capacitación eliminada con exito','cerrar');
            this.route.navigate(['../../'], { relativeTo: this.activatedRoute });
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta('Error al eliminar','cerrar');
          }
        });
        
      }
    })
    
  }

  eliminarParticipanteInscrito(dataParticipante: Inscrito) {  
    this.dialog.open(DialogEliminarInscritoComponent,{
      disableClose: true,
      width: '400px',
      data: dataParticipante
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.capacitacionService.eliminarParticipanteInscrito(dataParticipante.id_inscripcion).subscribe({
          next: (data) => {
            console.log(data);
            this.mostrarAlerta('Participante eliminado con exito','cerrar');
            this.mostrarParticipantes();
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta('Error al eliminar','cerrar');
          }
        });
        
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
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterData();
  }

  filterData() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });

  }
  mostrarParticipantes(){
    const id_capacitacion = this.activatedRoute.snapshot.params['id_capacitacion'];
    //this.informacionParticipante$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion)
     this.listTabla$ = this.capacitacionService.getInscritosCapacitacion(id_capacitacion);
     this.listTabla$.subscribe({
       next: (data: ParticipantesInscritos) => {
         this.dataSource.data = data.inscritos;

         console.log('DATASOURCE DEL LIST-TABLA',this.dataSource.data);
         this.dataSource.filterPredicate = (data: Inscrito, filter: string) => {
           const personasData = data.Participantes.Personas;

           const values = Object.values(personasData);
           const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
           return valueStrings.some(value => value.includes(filter));
         };
       },error: (error) => {
         console.log(error);
       }
     });
  };




  inscribirParticipante(){
    this.dialog.open(DialogInscribirParticipanteComponent,
      {
        disableClose: true,
        width: '600px',
        data:{id_capacitacion: this.activatedRoute.snapshot.params['id_capacitacion']}

      }).afterClosed().subscribe(resultado => {
        if(resultado==="Creado"){
          this.mostrarParticipantes();
          //this.componeteInscritos.mostrarParticipantes();
        }
      });


  }


  VerParticipante(dataParticipante: NuevoParticipante) {
    console.log('DATA ENVIADO DESDE GET',dataParticipante);
    this.dialog.open(FormParticipanteAddEditComponent,{
      
      disableClose: true,
      width: '700px',
      data:  dataParticipante
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.mostrarParticipantes();
      }
    })
    
  }

  abrirInformacion(datoParticipante: Inscrito): void {
    const bottomSheetRef = this._bottomSheet.open(VistaParticipanteComponent,{
      data: datoParticipante
    });
    console.log('DATO PARTICIPANTE BOTON',datoParticipante);
  }
}

