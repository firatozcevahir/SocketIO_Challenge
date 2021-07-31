import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayButtonsComponent } from './day-buttons.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DayButtonsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    DayButtonsComponent
  ]
})
export class DayButtonsModule { }
