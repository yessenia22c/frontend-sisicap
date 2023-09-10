import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  open() {
    this.isOpen.next(true);
  }

  close() {
    this.isOpen.next(false);
  }
constructor() { }

}
