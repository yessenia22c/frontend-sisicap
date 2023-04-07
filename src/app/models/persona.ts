export interface Persona {
    id_persona:number,
    nombre_per:string,
    primer_apellido:string, 
    segundo_apellido?:string,//asi se permite nulos
    nro_ci:string,
    id_sexo:number,
    correo?:string,
    telefono?:string,
    id_ciudad:number,
    fecha_nac?:string,
    id_pais:number
}
