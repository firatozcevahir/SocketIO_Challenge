import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable({ providedIn: 'root' })
export class TokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const res = this.authService.authenticated();
    if (res) {
      this.router.navigate(['/']).then();
      return false;
    } else {
      return true;
    }
  }
}
