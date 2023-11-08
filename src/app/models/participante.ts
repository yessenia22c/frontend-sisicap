export interface Participante {
    status:           number;
    AllParticipantes: AllParticipante[];
}

export interface AllParticipante {
    id_participante:     number;
    ocupacion:           null | string;
    codigo_participante: string;
    Personas:            personas;
    usuario:             Usuario;
}

export interface personas {
    id_persona:       number;
    nombres_per:      string;
    apellidos:        string;
    nro_ci:           string;
    correo:           string;
    telefono:         null | string;
    ciudad:           Ciudad;
    sexo:             Sexo;
    fecha_nac:        string | null;
    Pais:             Pais;
    
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



export interface CreaParticipante {
    id_registrante:      number;
    id_persona:          number;
    ocupacion:           string;
    codigo_participante: string;
}




//Registros


export interface NuevoParticipante {
    Personas:  DatosPersona;
    id_participante: number;
    id_registrante: number;
    ocupacion:      string;
}

export interface DatosPersona {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
    nro_ci:      string;
    id_sexo:     number;
    correo:      string;
    telefono:    string;
    id_ciudad:   number;
    fecha_nac:   string | null;
    id_pais:     number;
}


//Personas No participantes

export interface PersonaNoParticipante {
    status:                  number;
    personasNoParticipantes: PersonasNoParticipante[];
}

export interface PersonasNoParticipante {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
    nro_ci:      string;
    Personas:    null;
}


export interface AsignarNuevoParticipante {
    id_participante: number;
    id_persona:      number;
    id_registrante:  number;
    ocupacion:       string;
}
