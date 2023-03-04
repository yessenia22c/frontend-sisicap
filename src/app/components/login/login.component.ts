import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],

    })
   }
  ingresar(){
    const usuario = this.form.value.usuario;
    const contrasena = this.form.value.contrasena;
    console.log(usuario);
    console.log(contrasena);

  }

  ngOnInit(): void {
  }

}
