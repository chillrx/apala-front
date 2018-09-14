import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { environment } from '../../../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CrudService {

  optionsToAuth = new RequestOptions({
    'headers': new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'token': JSON.parse(JSON.parse(sessionStorage.user)._body).token
    })
  });

  constructor(
    private _http: Http,
    private _snackBar: MatSnackBar
  ) { }

  create = (params) => new Promise((resolve, reject) => {
    this._http
      .post(
        environment.crudServiceUrl + params.route,
        params.objectToCreate,
        this.optionsToAuth
      ).subscribe(res => {
        let aux = JSON.parse(res['_body']);
        
        if (aux.message)
          this._snackBar.open(aux.message, '', {
            duration: 2000,
            panelClass: ['error']
          });
        else
          this._snackBar.open('Dados cadastrados com sucesso!', '', {
            duration: 2000,
            panelClass: ['success']
          });
          
        if (aux.message) aux = undefined;

        resolve(aux);
      });
  })

  read = (params) => new Promise((resolve, reject) => {
    this._http
      .get(
        environment.crudServiceUrl + params.route, this.optionsToAuth
      ).subscribe(res => {
        resolve(JSON.parse(res['_body']));
      });
  })

  delete = (params) => new Promise((resolve, reject) => {
    const route: string = params.route;
    const paramToDelete: any = params.paramToDelete;

      this._http.delete(
        environment.crudServiceUrl + params.route + '/' + paramToDelete,
        this.optionsToAuth)
        .subscribe(res => {
          const aux = JSON.parse(res['_body']);

          if (aux.message)
            this._snackBar.open(aux.message, '', {
              duration: 2000,
              panelClass: ['error']
            });
          else
            this._snackBar.open('Dados deletados com sucesso!', '', {
              duration: 2000,
              panelClass: ['success']
            });

          resolve(aux);
        }, rej => {
          reject({
            cod: 'error-c-01',
            message: 'message',
            apiBody: 'json'
          });
        });
  })

  update = (params) => new Promise((resolve, reject) => {
    this._http
      .put(
        environment.crudServiceUrl + params.route,
        params.objectToUpdate,
        this.optionsToAuth
      ).subscribe(res => {
        let aux = JSON.parse(res['_body']);

        if (aux.message) aux = undefined;

        if (aux.message)
          this._snackBar.open(aux.message, '', {
            duration: 2000,
            panelClass: ['error']
          });
        else
          this._snackBar.open('Dados alterados com sucesso!', '', {
            duration: 2000,
            panelClass: ['success']
          });
        resolve(aux);
      }, rej => {
        if (rej['_body'].message)
          this._snackBar.open('Erro ao atualizar os dados!', '', {
            duration: 2000,
            panelClass: ['error']
          });
      });
  })

}
