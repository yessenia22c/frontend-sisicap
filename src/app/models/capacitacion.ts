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
    nombre_categoria: string;
}