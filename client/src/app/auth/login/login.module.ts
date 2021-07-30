import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AppModule } from '@app/app.module';
import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LoginModule { }
