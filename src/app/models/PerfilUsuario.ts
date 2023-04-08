export interface Usuario_perfil {
    id_usuario: number,
    nombre_usuario: string;

    tipo_usuario: {
        nombre_tipo_usuario: string
    },
    empleado: {

        persona: {
            nombres_per: string
            primer_apellido: string,
            segundo_apellido: string,

        }
    }
}