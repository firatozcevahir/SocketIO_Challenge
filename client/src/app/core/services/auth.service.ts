import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoginDto } from '@models/login-dto.model';
import { Router } from '@angular/router';
import { UserDetailModel } from '@app/core/models/user-detail.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = environment.api;
  private authentication = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  public authenticated(): boolean {
    if (this.authentication) {
      return true;
    }
    const result = localStorage.getItem('auth');
    this.authentication = result ? true : false;
    return this.authentication;
  }


  public login(model: LoginDto): Observable<any> {
    return this.http.post(`${this.api}/login`, model)
      .pipe(
        map((res => {
          return this.setAuthentication(res);
        }))
      );
  }

  public logout(): void {
    localStorage.clear();
    this.authentication = false;
    this.router.navigate(['/auth']);
  }


  public hello(): Observable<any> {
    return this.http.get(`${this.api}/hello`);
  }

  private setAuthentication(response: any): any {
    localStorage.setItem('auth', JSON.stringify(response));
    this.authentication = true;
    return response;
  }

  public getUserDetails(): UserDetailModel {
    const result = localStorage.getItem('auth');
    return result ? JSON.parse(result) : null;
  }
}
