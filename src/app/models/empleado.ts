export interface Empleado {
    status:    number;
    Empleados: EmpleadoList[];
}

export interface EmpleadoList {
    id_empleado:        number;
    fecha_contrato:     Date;
    persona:            Persona;
    empresa_empleadora: EmpresaEmpleadora;
    cargo:              Cargo;
}

export interface Cargo {
    id_cargo:     number;
    nombre_cargo: string;
}

export interface EmpresaEmpleadora {
    id_empresa:       number;
    nombre_empleador: string;
}

export interface Persona {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
    nro_ci:      string;
}
