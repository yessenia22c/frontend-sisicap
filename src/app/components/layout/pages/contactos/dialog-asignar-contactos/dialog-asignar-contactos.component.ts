import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { GrupoSeguimiento, UnGrupoSeguimiento, UnSeguimiento } from 'src/app/models/seguimiento';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContactosAsignar, ListaContacto } from 'src/app/models/contactoAsignar';
import { ContactoService } from 'src/app/services/contacto.service';
@Component({
  selector: 'app-dialog-asignar-contactos',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './dialog-asignar-contactos.component.html',
  styleUrls: ['./dialog-asignar-contactos.component.css']
})
export class DialogAsignarContactosComponent implements OnInit {
  constructor(
    private seguimientoService: SeguimientoService,
    public dialogRef: MatDialogRef<DialogAsignarContactosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListaContacto[],
    private _snackBar: MatSnackBar,
    private contactoService: ContactoService,
  ){

  }
  contactosAsignar$!: Observable<ContactosAsignar>;
  showAutocomplete = false;
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autoTrigger!: MatAutocompleteTrigger;
  @ViewChild('myInput', { static: false }) myInput!: ElementRef<HTMLInputElement>;
  seleccionado!: UnGrupoSeguimiento  ;
  grupoSeguimientos = inject(SeguimientoService)
  listSeguimientos$: Observable<GrupoSeguimiento>  |  undefined;
  UnSeguimiento$: Observable<UnSeguimiento> | undefined;
  selected3: any;
  myControl = new FormControl('', Validators.required);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions$!: Observable<UnGrupoSeguimiento[]>;
  selectedOptionValue!: string;
  seguimientos$!: Observable<UnGrupoSeguimiento[]> ;

  seleccionOpcion!: UnGrupoSeguimiento;

  
  ngOnInit() {
    console.log('data seleccionada',this.data);
    this.mostrarSeguimientos();
    this.myControl.valueChanges.subscribe(value => {
      this._filter(value || '').subscribe(data => {
        this.filteredOptions$ = of(data);
      });
    });
  }
  onInputChange(event: Event) {
    const valorInput = this.inputField.nativeElement.value
    // const inputValue = (event.target as HTMLInputElement).value;
    // // this.showAutocomplete = inputValue.length > 0;
    // if(valorInput.length > 0){
    //   this.filteredOptions = this.myControl.valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filter(value || '')),
    //   );
    // }
    //borrar el contenido del filtrado
    if (valorInput.trim() === '') {
      this.clearSelection();
    }

  }
  clearSelection() {
    if (this.autoTrigger) {
      this.autoTrigger.closePanel();
    }
  }

  mostrarSeguimientos(){
    this.listSeguimientos$ = this.grupoSeguimientos.getGruposSeguimiento();
    this.listSeguimientos$.subscribe(
      (data: GrupoSeguimiento) => {
        this.seguimientos$ = of(data.UnGrupoSeguimiento);
        console.log('Seleccion',this.selected3);
        // const items = data.UnGrupoSeguimiento;
        // if (items) {
        //   items.filter(x => x.nombre_seguimiento.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        // }
      }
    );
    
  }

  actualizarOpcionesSeleccionadas(event: any){
    this.seleccionado = event;
    
  }
  private _filter(value: string): Observable<UnGrupoSeguimiento[]> {
    const filterValue = value.toLowerCase();
    return this.seguimientos$?.pipe(
      map(seguimientos => seguimientos.filter(seguimiento => seguimiento.nombre_seguimiento.toLowerCase().includes(filterValue)))
    )
    // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion,{
      horizontalPosition: 'end',
      verticalPosition: 'top', 
      duration: 10000

    });
 
  }
  opcionSeleccionado( value: UnGrupoSeguimiento){
    this.seleccionOpcion = value;
    console.log('opcion seleccionada', this.seleccionOpcion);

  }
  asignarContactos(){
    // Se debe obtener el valor del valor seleccionado
    
    const modelo: ContactosAsignar = {
      id_grupo_seguimiento: this.seleccionOpcion.id_grupo_seguimiento,
      id_capacitacion: this.seleccionOpcion.Capacitacion.id_capacitacion,
      listaContactos: this.data
    }
    this.contactosAsignar$ = this.contactoService.asignarContactos(modelo);
    this.contactosAsignar$.subscribe({
      next: (data) => {
        console.log('data', data);
        
        
        this.mostrarAlerta(`Se asignaron ${data.nroContactosRegistrados} contactos y ${data.nroContactosSaltados} contactos no se asignaron`, 'Cerrar');
        
        // this.mostrarAlerta(`${data.mensaje}`, 'Cerrar');
        this.dialogRef.close();
      },
      error: error => {
        console.error('Error', error);
        this.mostrarAlerta('Error al asignar contactos', 'Cerrar');
      }
    });

  }

}
