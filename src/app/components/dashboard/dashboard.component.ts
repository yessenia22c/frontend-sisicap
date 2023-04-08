import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { Usuario } from 'src/app/models/Usuarios';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{ 
  constructor( ){

  }
  user: Usuario | null = null;
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(LoginService);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),shareReplay());

  ngOnInit() {
       this.authService.getProfile().subscribe(user => {
       this.authService.setAuthState(user);
       
     });

    this.authService.authState$
    .subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.limpiarToken();
    this.router.navigate(['/login']);
  }



}
