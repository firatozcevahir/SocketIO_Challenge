import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const res = this.authService.authenticated();
    if (res) {
      return true;
    } else {
      this.router.navigate(['/auth']).then();
      return false;
    }
  }
}
