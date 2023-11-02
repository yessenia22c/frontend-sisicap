export interface Usuario {
    nombre_usuario: string;
    contrasena_us: string;

}
export interface Token {
    //token:string
}

//Todos los usaurios interfaces 
export interface UsuariosSistema {
    status:  number;
    usuario: UsuarioList[];
}

export interface UsuarioList {
    id_usuario:     number;
    nombre_usuario: string;
    contrasena_us:  string;
    foto_perfil:    string;
    tipo_usuario:   TipoUsuario;
    empleado:       Empleado;
}

export interface Empleado {
    id_empleado:     number;
    PersonaEmpleado: PersonaEmpleado;
}

export interface PersonaEmpleado {
    id_persona:  number;
    nombres_per: string;
    apellidos:   string;
    nro_ci:      string;
    correo:      string;
    telefono:    string;
}

export interface TipoUsuario {
    id_tipo_usuario:     number;
    nombre_tipo_usuario: string;
}

//fin todos los usuarios interfaces


//nuevoUsaurio
export interface NuevoUsuario {
    id_usuario:      number;
    id_empleado:     number;
    id_tipo_usuario: number;
    nombre_usuario:  string;
    contrasena_us:   string;
}


//tipo usuario

export interface TiposUsuarios {
    status:      number;
    tipoUsuario: TipoUsuario[];
}

