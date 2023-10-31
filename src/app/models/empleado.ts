export interface Empleado {
    status:    number;
    Empleados: EmpleadoList[];
}

export interface EmpleadoList {
    id_empleado:        number;
    fecha_contrato:     string | null;
    PersonaEmpleado:    PersonaEmpleado;
    empresa_empleadora: EmpresaEmpleadora;
    cargo:              Cargo;
}

export interface PersonaEmpleado {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
    nro_ci:      string;
    correo:      string;
    telefono:    string;
    fecha_nac:   string | null;
    sexo:        Sexo;
    ciudad:      Ciudad;
    Pais:        Pais;
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

export interface Cargo {
    id_cargo:     number;
    nombre_cargo: string;
}

export interface EmpresaEmpleadora {
    id_empresa:       number;
    nombre_empleador: string;
}



// NuevoEmpleado
export interface NuevoEmpleado {
    UnaPersonaEmpleado:    UnaPersonaEmpleado;
    id_empleado:           number;
    id_cargo:              number;
    fecha_contrato:        string | null;
    id_empresa_empleadora: number;
}

export interface UnaPersonaEmpleado {
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



export interface CargosList {
    status: number;
    Cargos: Cargo[];
}

export interface EmpresasList {
    status: number;
    Empresas: EmpresaEmpleadora[];
}