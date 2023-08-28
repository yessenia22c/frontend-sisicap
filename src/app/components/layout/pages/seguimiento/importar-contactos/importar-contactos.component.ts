import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
//Material

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ContactosAgregar, ListaContacto } from 'src/app/models/seguimiento';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-importar-contactos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    RouterModule,
    MatPaginatorModule
  
  ],
  templateUrl: './importar-contactos.component.html',
  styleUrls: ['./importar-contactos.component.css']
})
export default class ImportarContactosComponent {
  displayedColumns = ['nro', 'nombre_apellidos', 'numero_contacto', 'correo_contacto'];
  dataSource = ELEMENT_DATA;
  excelData: any;
  listContactos$: Observable<ContactosAgregar> | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private seguimientoService: SeguimientoService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }
  leerExcel( event: any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: any) => {
      let workbook = XLSX.read(reader.result, {type: 'binary'});
      let hoja = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[hoja[0]]);

      console.log(this.excelData)
      
    }


  }
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 8000

    });
 
}
  
  
  subirContactos(): void{
    const id_grupo_seguimiento = this.activatedRoute.snapshot.params['id_seguimiento'];
    const modelo: ContactosAgregar = {
      id_grupo_seguimiento: id_grupo_seguimiento,
      listaContactos: this.excelData
  
    };
    this.listContactos$ = this.seguimientoService.subirContactosSeguimiento(modelo);
    this.listContactos$.subscribe({
      next :(data) => {
        this.mostrarAlerta('Contactos subidos exitosamente', 'Listo');
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }, error: (e) => {
        this.mostrarAlerta('No se ha podido subir', 'Error');
      }
    })


  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

