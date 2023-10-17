export interface SeguimientoContacto {
    InformacionContacto: InformacionContacto;
    informacionActualizadoContacto: any
    
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
    correo_contacto:  string | null;
    nombre_empresa:   string | null;
    profesion:        string | null;
    intereses:        string    | null;
    observaciones:    string    | null;
    Sexo_contacto:    SexoContacto ;
    Ciudad_contacto:  CiudadContacto ;
    Pais_contacto:    PaisContacto ;
    Estado:           Estado ;
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


export interface CreaContacto {
    id_contacto:         number;
    nombre_apellidos:    string;
    numero_contacto:     string;
    id_estado_contacto: number;
    correo_contacto:     string;
    nombre_empresa:      string;
    id_sexo:             number | null;
    id_ciudad:           number | null;
    id_pais:             number | null;
    profesion:           string;
    intereses:           string;
    observaciones:       string;
    datosContacto:       any  ;
}
export interface PaisSeleccionado {
    id_pais: number | null;
    nombre_pais: string | null; // Solo para mostrar en la tabla
}


export interface EstadoContactos {
    status:  number;
    Estados: AllEstado[];
}

export interface AllEstado {
    id_estado_contacto: number;
    nombre_estado:      string;
}
