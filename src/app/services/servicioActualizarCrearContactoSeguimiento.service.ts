import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreaContacto } from '../models/contacto';
import { AllContacto } from '../models/contactoAsignar';

@Injectable({
  providedIn: 'root'
})
export class ServicioActualizarCrearContactoSeguimientoService {
@Output() disparadorContactos: EventEmitter<any> = new EventEmitter();

@Output() disparadorContactosAct: EventEmitter<any> = new EventEmitter();

@Output() listaContactos: EventEmitter<any> = new EventEmitter();


//compartir dato entre componentes que no tienen relacion padre Hijo
private listaContactosSource = new BehaviorSubject<{ id: number, contacto: AllContacto } | null>(null);

  actualizarContacto(contacto: AllContacto) {
    this.listaContactosSource.next({ id: contacto.id_contacto, contacto });
  }

  constructor() {}

  obtenerActualizacionesContactos() {
    return this.listaContactosSource.asObservable();
  }
}
