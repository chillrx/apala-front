import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class CrudService {

    optionsToAuth = new RequestOptions({
        'headers': new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token': sessionStorage.user ? JSON.parse(JSON.parse(sessionStorage.user)._body).token : ''
        })
    });

    constructor(
        private _http: Http
    ) { }

    get = (route) => new Promise((resolve, reject) => {
        this._http.get(environment.crudServiceUrl + route, this.optionsToAuth).subscribe(res => resolve(JSON.parse(res['_body'])), rej => reject(JSON.parse(rej['_body'])));
    })

    delete = (route) => new Promise((resolve, reject) => {
        this._http.delete(environment.crudServiceUrl + route, this.optionsToAuth).subscribe(res => resolve(JSON.parse(res['_body'])), rej => reject(JSON.parse(rej['_body'])));
    })

    post = (route, data) => new Promise((resolve, reject) => {
        this._http.post(environment.crudServiceUrl + route, data, this.optionsToAuth).subscribe(res => resolve(JSON.parse(res['_body'])), rej => reject(JSON.parse(rej['_body'])));
    })

    patch = (route, data) => new Promise((resolve, reject) => {
        this._http.patch(environment.crudServiceUrl + route, data, this.optionsToAuth).subscribe(res => resolve(JSON.parse(res['_body'])), rej => reject(JSON.parse(rej['_body'])));
    })

    put = (route, data) => new Promise((resolve, reject) => {
        this._http.put(environment.crudServiceUrl + route, data, this.optionsToAuth).subscribe(res => resolve(JSON.parse(res['_body'])), rej => reject(JSON.parse(rej['_body'])));
    })

}
