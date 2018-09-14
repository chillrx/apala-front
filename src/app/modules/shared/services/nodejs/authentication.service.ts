import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class AuthenticationService {
  public authUrl = environment.authenticationServiceUrl;
  public crudUrl = environment.crudServiceUrl;
  headersToAuth: Headers;
  optionsToAuth: RequestOptions;

  constructor(
    private _http: Http,
    private _router: Router,
    public _snackbar: MatSnackBar
  ) { }

  login = (params) => new Promise((resolve, reject) => {
    if (!params)
      resolve({
        code: 'l-error-01',
        message: 'Defina parâmetros mínimos'
      });

    this.headersToAuth = new Headers({
      'Content-Type': 'application/json'
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    });

    if (params.loginMode === "emailAndPassword") {
      this._http
        .post(
          this.authUrl,
          {
            email: params.user,
            senha: params.password
          },
          this.optionsToAuth
        ).subscribe(res => {
          const aux = JSON.parse(res['_body']);

          if (aux.message)
            this._snackbar.open(aux.message, '', {
              duration: 4000,
              panelClass: ['error']
            });

          if (aux.token) {
            sessionStorage.setItem('user', JSON.stringify(res));
            this._router.navigate([params.navigateTo]);
            this._snackbar.open('Login feito com sucesso!', '', {
              duration: 4000,
              panelClass: ['success']
            });
          }

          resolve(res);
        }, rej => {
          this._snackbar.open(rej.message || 'Erro ao logar!', '', {
            duration: 10000,
            panelClass: ['error']
          });

          reject(rej);
        });
    }
  });

  logout = (params) => {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  setUser = () => new Promise((resolve, reject) => {
    resolve({ id: JSON.parse(JSON.parse(sessionStorage.user)._body).usuario.id });
  })
}
