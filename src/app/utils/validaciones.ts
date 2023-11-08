import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidacionServiceService } from '../services/validacion-service.service';
import { map } from 'rxjs/operators';

export class Validaciones {
    static validarNombreUsuario(validacionService: ValidacionServiceService) {
        return (control: AbstractControl) => {
            const nombre_usuario = control.value;
            return validacionService.validarNombreUsuario(nombre_usuario).pipe(
                map((response: any) => {
                    return response.disponible ? null : { nombreUsuarioNoDisponible: true };
                })
            );
        };
    }


    static validarCarnetIdentidad(validacionService: ValidacionServiceService) {
        console.log('validarCarnetIdentidad');
        return (control: AbstractControl) => {
            const nro_ci = control.value;
            //console.log('CARNET A VALIDAD', nro_ci);
            return validacionService.validarNroCi(nro_ci).pipe(
                map((response: any) => {
                    return response.disponible ? null : { carnetYaRegistrado: true };
                })
            );
        };
    }

    static validarCorreo(validacionService: ValidacionServiceService) {
        return (control: AbstractControl) => {
            const correo = control.value;
            return validacionService.validarCorreo(correo).pipe(
                map((response: any) => {
                    return response.disponible ? null : { correoYaRegistrado: true };
                })
            );
        };
    }

}