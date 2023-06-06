import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormParticipanteAddEditComponent } from './form-participante-add-edit/form-participante-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './dialogo-delete/dialogo-delete.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { ParticipanteService } from 'src/app/services/participante.service';
import { AllParticipante, DatosPersona, NuevoParticipante, Participante, personas } from 'src/app/models/participante';
@Component({
  selector: 'app-participante',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, 
    MatInputModule, MatTableModule,MatPaginatorModule ],
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export default class ParticipanteComponent {
  
  displayedColumns: string[] = ['id_participante', 'nombres_per', 'apellidos', 'nro_ci', 'correo', 'telefono', 'ocupacion', 'codigo_participante', 'id_ciudad', 'id_usuario', 'accion'];
  informacionPersonas$: Observable<Participante> | undefined;

  dataSource = new  MatTableDataSource<AllParticipante>();

  filtroDatos = new MatTableDataSource<AllParticipante["Personas"]>();
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private participanteService: ParticipanteService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    
  }
  ngOnInit(): void {
    this.mostrarPersonas();
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
  
  mostrarPersonas(){
    this.informacionPersonas$ = this.participanteService.getParticipantes();

    this.informacionPersonas$.subscribe({
      next: (resp: Participante) => {
        console.log('RESP',resp);
        this.dataSource.data = resp.AllParticipantes;
        //Filter predicate ayuda a obtener los datos relevantes para la busqueda dentro del DataSource
        this.dataSource.filterPredicate = (data: AllParticipante, filter: string) => {
          const personasData = data.Personas;
          const values = Object.values(personasData);
          const valueStrings = values.map(value => (value !== null ? value.toString().toLowerCase() : ''));
          return valueStrings.some(value => value.includes(filter));
        };

        console.log('DATASOURCE',this.dataSource);
      }, error:(err)=> {
        console.log(err);
      },
      
    })
  };

  nuevoParticipante() {
    this.dialog.open(FormParticipanteAddEditComponent,{
      disableClose: true,
      width: '700px',
    }).afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){
        this.mostrarPersonas();
      }
    })
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(FormParticipanteAddEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editarParticipante(dataPersona: NuevoParticipante) {
    console.log('DATA',dataPersona);
    this.dialog.open(FormParticipanteAddEditComponent,{
      
      disableClose: true,
      width: '700px',
      data:  dataPersona
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado"){
        this.mostrarPersonas();
      }
    })
    
  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000

    });
  }
  dialogoEliminarParticipante(dataPersona: NuevoParticipante) {

    this.dialog.open(DialogoDeleteComponent,{
      
      disableClose: true,
      data:  dataPersona
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar"){
        this.participanteService.eliminarParticipante(dataPersona.id_participante).subscribe({
          next: (resp) => { 
            console.log('RESP',resp);
            this.mostrarAlerta('Participante eliminado correctamente', 'Listo');
            
            this.mostrarPersonas();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
  }
}
