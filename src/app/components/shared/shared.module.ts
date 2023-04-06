import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';


//Angular material

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule

  ],
  exports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class SharedModule { }