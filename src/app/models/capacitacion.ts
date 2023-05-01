export interface Capacitacion {
    status:          number;
    UnaCapacitacion: UnaCapacitacion[];
}

export interface UnaCapacitacion {
    id_capacitacion:     number;
    nombre_capacitacion: string;
    fecha_inicio_cap:    Date;
    fecha_fin_cap:       Date;
    cantidad_modulos:    number;
    Categoria:           Categoria;
}

export interface Categoria {
    id_categoria:   number;
    nombre_categoria: string;
}

export interface CreaCapacitacion {
    nombre_capacitacion: string;
    fecha_inicio_cap:    string;//Probar el format en string
    fecha_fin_cap:       string;//Probar el format en string
    cantidad_modulos:    number;
    id_categoria:        number;
}


export interface GetCapacitacion {
    status:          number;
    UnaCapacitacion: UnaCapacitacion;
}
