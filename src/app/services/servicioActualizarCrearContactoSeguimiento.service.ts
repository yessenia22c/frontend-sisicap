import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioActualizarCrearContactoSeguimientoService {
@Output() disparadorContactos: EventEmitter<any> = new EventEmitter();

@Output() disparadorContactosAct: EventEmitter<any> = new EventEmitter();
constructor() { }

}
