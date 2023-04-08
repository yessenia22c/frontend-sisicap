import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { SharedModule } from './components/shared/shared.module';

//Componentes
import { LoginComponent } from './components/login/login.component';
//import { PanelComponent } from './components/panel/panel.component';
//import { AdminComponent } from './components/admin/admin.component';


//servicios
import {LoginService} from './services/login.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
   
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
