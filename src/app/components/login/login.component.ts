import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

/**
 * Services
 */
import { AuthenticationService } from './../../modules/shared/services/nodejs/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public disabled = false;

  public loginForm: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    public _snackbar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl(null),
      password: new FormControl(null)
    });
    this.loginForm.controls.user.markAsTouched();
    this.loginForm.controls.password.markAsTouched();
  }

  ngOnInit() {
  }

  onLoginSubmit = () => {
    this.disabled = true;
    const params = {
      user: this.loginForm.get('user').value,
      password: this.loginForm.get('password').value,
      loginMode: 'emailAndPassword',
      navigateTo: '/main'
    };

    this._auth.login(params);

    setTimeout(_ => {
      this.disabled = false;
    }, 1500);
  }
}
