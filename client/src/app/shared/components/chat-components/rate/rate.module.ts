import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComponent } from './rate.component';
import { MatButtonModule } from '@angular/material/button';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    RateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    NgbRatingModule
  ],
  exports: [
    RateComponent
  ]
})
export class RateModule { }
