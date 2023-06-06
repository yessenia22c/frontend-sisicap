
// export interface Usuario_perfil {
//     status: number,
//     usuario: {
//         nombre_usuario: string,
//         tipo_usuario: {
//             nombre_tipo_usuario: string
//         },
//         empleado: {
//             id_empleado: number,
//             persona: {
//                 nombres_per: string,
//                 primer_apellido: string,
//                 segundo_apellido: string
//             }
//         }
//     }
// }

export interface PerfilUsuario {
    status:  number;
    usuario: Usuario;
}

export interface Usuario {
    nombre_usuario: string;
    tipo_usuario:   TipoUsuario;
    empleado:       Empleado;
}

export interface Empleado {
    id_empleado: number;
    persona:     Persona;
}

export interface Persona {
    nombres_per:      string;
    apellidos:  string;
}

export interface TipoUsuario {
    nombre_tipo_usuario: string;
}
