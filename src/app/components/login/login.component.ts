import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from './../../modules/shared/services/nodejs/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public disabled = false;
    public loginForm: FormGroup = new FormGroup({
        user: new FormControl(null),
        password: new FormControl(null)
    });

    constructor(
        private _auth: AuthenticationService
    ) {}

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

        setTimeout(_ => this.disabled = false, 2000);
    }

}
