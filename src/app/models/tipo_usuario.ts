export interface Tipo_usuario {
    id_tipo_usuario: number;
    nombre_tipo_usuario: string;
    descripcion: string;
}


export interface TipoUsuarioList {
    status:           number;
    allTipos_usuario: Tipo_usuario[];
}

export interface Niveles {
    status:      number;
    nivelAcceso: NivelAcceso[];
}

export interface NivelAcceso {
    id_nivel:     number;
    nombre_nivel: string;
}

export interface UnTipoUsuario{
    status: number;
    tipo_usuario: Tipo_usuario;
}