import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'; 

import {MatDialogModule, MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-form-capacitacion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './form-capacitacion.component.html',
  styleUrls: ['./form-capacitacion.component.css']
})
export class FormCapacitacionComponent {

}
