import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from '@app/auth/login/login.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
