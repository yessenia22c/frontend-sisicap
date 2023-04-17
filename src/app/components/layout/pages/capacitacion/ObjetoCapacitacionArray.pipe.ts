import { Pipe, PipeTransform } from '@angular/core';
import { Capacitacion } from 'src/app/models/capacitacion';

@Pipe({
  name: 'ObjetoCapacitacionArray'
})
export class ObjetoCapacitacionArrayPipe implements PipeTransform {

  transform(object: Capacitacion ): any {
    return Object.values(object);
  }

}
