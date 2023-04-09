
export interface Usuario_perfil {
    status: number,
    usuario: {
        nombre_usuario: string,
        tipo_usuario: {
            nombre_tipo_usuario: string
        },
        empleado: {
            id_empleado: number,
            persona: {
                nombres_per: string,
                primer_apellido: string,
                segundo_apellido: string
            }
        }
    }
}