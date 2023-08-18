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
