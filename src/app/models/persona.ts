export interface Persona {
    status:      number;
    AllPersonas: AllPersona[];
}

export interface AllPersona {
    id_persona:       number;
    nombres_per:      string;
    primer_apellido:  string;
    segundo_apellido: null | string;
    nro_ci:           string;
    correo:           string;
    telefono:         null | string;
    fecha_nac:        Date | null;
    sexo:             Sexo;
    ciudad:           Ciudad;
    Pais:             Pais;
}

export interface Pais {
    id_pais:     number;
    nombre_pais: string;
}


export interface Ciudad {
    id_ciudad:     number;
    nombre_ciudad: string;
}

export interface Sexo {
    id_sexo:     number;
    nombre_sexo: string;
}
