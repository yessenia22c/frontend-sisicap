export interface Contacto {
    status:      number;
    AllContacto: AllContacto[];
}

export interface AllContacto {
    id_contacto:      number;
    nombre_apellidos: string;
    numero_contacto:  string;
    correo_contacto:  null | string;
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
    id_ciudad:     number | null;
    nombre_ciudad: string | null;
}

export interface Estado {
    id_estado_contacto: number | null;
    nombre_estado:      string | null;
}

export interface SexoContacto {
    id_sexo:     number  | null ;
    nombre_sexo: string | null;
}

export interface PaisContacto {
    id_pais:     number | null;
    nombre_pais: string | null;
}

// export enum NombrePais {
//     Bolivia = "BOLIVIA",
//     OtroPaís = "OTRO PAÍS",
// }

// export enum NombreEstado {
//     Cliente = "CLIENTE",
//     PosibleCliente = "POSIBLE CLIENTE",
// }

// export enum NombreSexo {
//     Femenino = "FEMENINO",
//     Masculino = "MASCULINO",
// }


export interface ContactosAsignar {
    id_grupo_seguimiento: number;
    id_capacitacion:      number;
    listaContactos:       ListaContacto[];
    mensaje?:             string;
    nroContactosRegistrados?: number;
    nroContactosSaltados?: number;
}

export interface ListaContacto {
    id_contacto: number;
}


export interface ListaContactoSubir{
    listaContactos: ContactosSubir[];
}

export interface ContactosSubir{
    nombre_apellidos: string;
    numero_contacto: string;
    correo_contacto: string;
    nombre_empresa: string;
    profesion: string;
    intereses: string;
    observaciones: string;
}