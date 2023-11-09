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


//Niveles de acceso para un tipo de usuario
export interface NivelesAccesosTipoUsuario {
    status:     number;
    AllAccesos: AllAcceso[];
}

export interface AllAcceso {
    id_acceso:   number;
    NivelAcceso: NivelAcceso;
}

// export interface NivelAcceso {
//     id_nivel:     number;
//     nombre_nivel: string;
// }


//Asignar niveles de acceso a un tipo de usuario

export interface AsignarNivelesAcceso {
    id_tipo_usuario: number;
    niveles:         Nivel[];
}

export interface Nivel {
    id_nivel: number;
}
