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
        //console.log('validarCarnetIdentidad');
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
    static validarNumeroTelefono(validacionService: ValidacionServiceService) {
        return (control: AbstractControl) => {
            const numero_contacto = control.value;
            return validacionService.validarNumeroContacto(numero_contacto).pipe(
                map((response: any) => {
                    return response.disponible ? null : { numeroContactoYaRegistrado: true };
                })
            );
        };
    }
    static validarContrasena() {
        return (control: AbstractControl) => {
            const contrasena = control.value || '';
    
            // Criterios individuales de validación
            const tieneMayuscula = /[A-Z]/.test(contrasena);
            const tieneMinuscula = /[a-z]/.test(contrasena);
            const tieneNumero = /[0-9]/.test(contrasena);
            const tieneCaracterEspecial = /[!@#$%^&*]/.test(contrasena);
            const tieneLongitudSuficiente = contrasena.length >= 8;
    
            // Crear un objeto de errores vacío
            let errores: any = {};
    
            if (!tieneMayuscula) {
                errores.faltaMayuscula = 'La contraseña debe contener al menos una letra mayúscula';
            }
            if (!tieneMinuscula) {
                errores.faltaMinuscula = 'La contraseña debe contener al menos una letra minúscula';
            }
            if (!tieneNumero) {
                errores.faltaNumero = 'La contraseña debe contener al menos un número';
            }
            if (!tieneCaracterEspecial) {
                errores.faltaCaracterEspecial = 'La contraseña debe contener al menos un carácter especial';
            }
            if (!tieneLongitudSuficiente) {
                errores.faltaLongitud = 'La contraseña debe tener al menos 8 caracteres';
            }
    
            // Si no hay errores, devolver null. Si hay errores, devolver el objeto de errores.
            return Object.keys(errores).length > 0 ? errores : null;
        };
    }
    

}