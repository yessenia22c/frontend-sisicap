export interface Capacitacion {
    status:          number;
    UnaCapacitacion: UnaCapacitacion[];
}

export interface UnaCapacitacion {
    id_capacitacion:     number;
    nombre_capacitacion: string;
    fecha_inicio_cap:    string ;
    fecha_fin_cap:       string | null;
    cantidad_modulos:    number;
    Categoria:           Categoria;
}

export interface Categoria {
    id_categoria:   number;
    nombre_categoria: string;
}

export interface CreaCapacitacion {
    id_capacitacion:     number;
    nombre_capacitacion: string;
    fecha_inicio_cap:    string;//Probar el format en string
    fecha_fin_cap:       string | null;//Probar el format en string
    cantidad_modulos:    number;
    id_categoria:        number;
}


export interface GetCapacitacion {
    status:          number;
    UnaCapacitacion: UnaCapacitacion;
}

//INSCRITOS EN CAPACITACION

export interface ParticipantesInscritos {
    status:    number;
    inscritos: Inscrito[];
}

export interface Inscrito {
    Participantes: Participantes;
}

export interface Participantes {
    id_participante:      number;
    codigo_participante: string;
    ocupacion:           null | string;
    Personas:            Personas;
    usuario:             Usuario;
}

export interface Personas {
    id_persona:         number;
    nombres_per:        string;
    apellidos:          string;
    nro_ci:             string;
    correo:             string;
    telefono:           null | string;
    ciudad:             Ciudad;
    sexo:               Sexo;
    fecha_nac:          string | null;
    Pais:               Pais;
}
export interface Ciudad {
    id_ciudad:     number;
    nombre_ciudad: string;
}
export interface Sexo {
    id_sexo:     number;
    nombre_sexo: string;
}

export interface Pais {
    id_pais:     number;
    nombre_pais: string;
}

export interface Usuario {
    id_usuario:     number;
    nombre_usuario: string;
}


// PArticipantes no inscritos 
export interface ParticipantesNoInscritos {
    status:        number;
    participantes: Participante[];
}

export interface Participante {
    id_participante: number;
    Personas:        Personas;
}

export interface Personas {
    nombres_per: string;
    apellidos:   string;
}

//EDITAR CAPACITACION

export interface EditarCapacitacion {
    id_capacitacion:     number;
    nombre_capacitacion: string;
    fecha_inicio_cap:    Date;
    fecha_fin_cap:       Date;
    cantidad_modulos:    number;
    id_categoria:        number;
}


export interface ListaInscripcion {
    inscripciones: Inscripciones[];
}

export interface Inscripciones {
    id_capacitacion: number;
    id_participante: number;
}
