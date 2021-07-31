import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteComponent } from './complete.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CompleteComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CompleteComponent
  ]
})
export class CompleteModule { }
