export interface SeguimientoContacto {
    InformacionContacto: InformacionContacto;
}

export interface InformacionContacto {
    id_historico:         number;
    id_grupo_seguimiento: number;
    fecha_actualizacion:  string;
    prox_llamada:         string | null;
    Contactos:            Contactos;
    TipoSeguimiento:      TipoSeguimiento | null;
    observacion_llamada:  string | null;
}

export interface Contactos {
    id_contacto:      number;
    nombre_apellidos: string;
    numero_contacto:  string;
    correo_contacto:  string   | null;
    nombre_empresa:   string | null;
    profesion:        string | null;
    intereses:        string    | null;
    observaciones:    string    | null;
    Sexo_contacto:    SexoContacto | null;
    Ciudad_contacto:  CiudadContacto | null;
    Pais_contacto:    PaisContacto | null;
    Estado:           Estado | null;
}

export interface CiudadContacto {
    id_ciudad: number | null;
}

export interface Estado {
    id_estado_contacto: number | null;
}

export interface PaisContacto {
    id_pais: number | null;
}

export interface SexoContacto {
    id_sexo: number | null;
}

export interface TipoSeguimiento {
    id_tipo_seguimiento: number | null;
}
// GUARDAR CAMBIOS
export interface Cambio {
    id_historico:        number;
    observacion_llamada: string;
    fecha_seguimiento: string;
}

export interface AllCambio {
    status:             number;
    CambiosRegistrados: CambiosRegistrado[];
}

export interface CambiosRegistrado {
    id_historico:        number;
    observacion_llamada: string;
    fecha_seguimiento:   string;
}
