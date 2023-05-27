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


export interface creaPersona{
    nombres_per:      string;
    primer_apellido:  string;
    segundo_apellido: null | string;
    nro_ci:           string;
    id_sexo:          number;
    correo:           string;
    telefono:         null | string;
    id_ciudad:        number;
    fecha_nac:        string | null;
    id_pais:          number;
}



export interface Pais {
    status:  number;
    AllPais: AllPaises[];
}

export interface AllPaises {
    id_pais:     number;
    nombre_pais: string;
}

export interface Sexo {
    status:  number;
    AllSexo: AllSexos[];
}

export interface AllSexos {
    id_sexo:     number;
    nombre_sexo: string;
}


export interface Ciudad {
    status:    number;
    AllCiudad: AllCiudades[];
}

export interface AllCiudades {
    id_ciudad:     number;
    nombre_ciudad: string;
}
