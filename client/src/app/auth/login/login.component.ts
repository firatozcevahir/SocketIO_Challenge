import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public form = this.formBuilder.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.hello().subscribe((res) =>{
    });
  }


  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    const model = {
      userName: data.userName,
      password: Md5.hashStr(data.password).toString()
    }

    this.authService
      .login(model)
      .subscribe((res) =>
      this.router.navigate(['/home']));
  }

}
