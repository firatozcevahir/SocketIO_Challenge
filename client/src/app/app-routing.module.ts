import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { TokenGuard } from './core/guards/token-guard.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [TokenGuard]
  }, {
    path: '**',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
