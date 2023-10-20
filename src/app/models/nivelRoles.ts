export interface NivelRoles {
    status:  number;
    nivelAcceso: Nivel[];
}

export interface Nivel {
    id_nivel: number;
    nombre_nivel: string;
}
