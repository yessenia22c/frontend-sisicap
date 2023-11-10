import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { SharedModule } from './shared/material.module';

//Componentes
import { LoginComponent } from './pages/login/login.component';
//import { PanelComponent } from './components/panel/panel.component';
//import { AdminComponent } from './components/admin/admin.component';


//servicios
import {LoginService} from './services/login.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ControlRolesDirective } from './directivas/control-roles.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // ControlRolesDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    
   
  ],
  providers: [
    LoginComponent,
    //JWT
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    // TOKEN INTERCEPTOR
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService,  multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
