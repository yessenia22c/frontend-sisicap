import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, timeout } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import {Usuario, Token} from '../../models/Usuarios'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  cargando = false;
  escondeContra = true;
  incorrecto = false;
  mensajeError = "";


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) {
    this.form = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required],

    })
   }
  ingresar(){
    const nombreUsuario = this.form.value.nombreUsuario;
    const contrasenaUsuario = this.form.value.contrasenaUsuario;

    

    //console.log(user.nombre_usuario); //Muestra el usuario en consola
    //console.log(user.contrasena_us); //muestra la contraseña en consola.
    
    if(nombreUsuario && contrasenaUsuario){
      const user: Usuario = {
        nombre_usuario: nombreUsuario,
        contrasena_us: contrasenaUsuario
      }
    
      this.loginService.login(user).pipe(tap((res: any)=> {
        //console.log(res);
        //localStorage.setItem('access_token', res.access_token);
        if(res && res.access_token) {
          this.falsoCargando();
          this.incorrecto=false;
          localStorage.setItem('access_token', res.access_token);
          // Redirigir a la página principal, por ejemplo
        } else {
          this.usuarioIncorrecto()
        }
      })    
      ).subscribe(); 
    }   
  }

  usuarioIncorrecto(){  
    this.incorrecto= true;  
    this.mensajeError = "Usuario incorrecto";
  }
  falsoCargando(){
    this.cargando = true;
    setTimeout(()=>{
      this.router.navigate(['dashboard']);
      //this.cargando= false;
    },1000);
  }

  ngOnInit(): void {
  }

}
