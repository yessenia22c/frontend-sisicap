export interface Seguimiento {
    nombre_seguimiento: string;
    fecha_creado:       string;
    id_capacitacion:    number;
    id_empleado:        number;
}
export interface GrupoSeguimiento {
    status:             number;
    UnGrupoSeguimiento: UnGrupoSeguimiento[];
}

export interface UnGrupoSeguimiento {
    id_grupo_seguimiento: number;
    nombre_seguimiento:   string;
    fecha_creado:         Date;
    Capacitacion:         Capacitacion;
    Empleado:             Empleado;
}

export interface Capacitacion {
    id_capacitacion:     number;
    nombre_capacitacion: string;
}

export interface Empleado {
    id_empleado: number;
    persona:     Persona;
}

export interface Persona {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
}

export interface CreaGrupoSeguimiento {
    id_grupo_seguimiento: number;
    nombre_seguimiento: string;
    fecha_creado:       string;
    id_capacitacion:    number;
    id_empleado:        number;
}


export interface GetSeguimiento {
    status:          number;
    UnGrupoSeguimiento: UnGrupoSeguimiento;
}


//VER GRUPO SEGUIMIENTO

export interface UnSeguimiento {
    status:             number;
    UnGrupoSeguimiento: UnGrupoSeguimiento;
}




// lista de contactos agregar

export interface ContactosAgregar {
    id_grupo_seguimiento: number;
    listaContactos:       ListaContacto[];
}

export interface ListaContacto {
    nombre_apellidos: string;
    numero_contacto:  string;
    correo_contacto:  string;
}

// Mostrar todos los contactos de un grupo de seguimiento

export interface ContactosSeguimiento {
    status:                  number;
    AllContactosSeguimiento: AllContactosSeguimiento[];
}

export interface AllContactosSeguimiento {
    id_historico:         number;
    id_grupo_seguimiento: number;
    fecha_actualizacion:  string;
    prox_llamada:  string;
    Contactos:            Contactos;
    TipoSeguimiento:      TipoSeguimiento | null;
}

export interface Contactos {
    id_contacto:      number;
    nombre_apellidos: string;
    numero_contacto:  string;
    correo_contacto:  string;
    nombre_empresa:   null | string;
    profesion:        null | string;
    intereses:        null | string;
    observaciones:    null | string;
    Sexo_contacto:    SexoContacto | null;
    Ciudad_contacto:  CiudadContacto | null;
    Pais_contacto:    PaisContacto | null;
    Estado:           Estado | null;
}

export interface CiudadContacto {
    id_ciudad:     number;
    nombre_ciudad: string;
}

export interface Estado {
    id_estado_contacto: number;
    nombre_estado:      string;
}

export interface PaisContacto {
    id_pais:     number;
    nombre_pais: string;
}

export interface SexoContacto {
    id_sexo:     number;
    nombre_sexo: string;
}

export interface TipoSeguimiento {
    id_tipo_seguimiento:     number;
    nombre_tipo_seguimiento: string;
}
