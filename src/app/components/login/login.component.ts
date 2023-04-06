import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
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
  /*usuario = {
    nombre_us: 'yessi',
    contrasena_us: '12345'
  }*/



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


    const user: Usuario = {
      nombre_usuario: this.form.value.nombreUsuario,
      contrasena_us: this.form.value.contrasenaUsuario
    }

    console.log(user.nombre_usuario); //Muestra el usuario en consola
    console.log(user.contrasena_us); //muestra la contraseña en consola.
    
    if(true){
      this.falsoCargando();
      this.loginService.login(user).subscribe( (res: any)=> {
        console.log(res);
        localStorage.setItem('access_token', res.access_token);
        
      }) ///AQUI HAY QUE AVERIGUAR COMO SE UTILIZAN LOS VALORES DE UNA INTERFAZ
    }else{
      //No se
    }
    

  }
  falsoCargando(){
    this.cargando = true;
    setTimeout(()=>{
      this.router.navigate(['dashboard']);
      //this.cargando= false;
    },1500);
  }

  ngOnInit(): void {
  }

}
