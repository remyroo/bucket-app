import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
    templateUrl: './auth.component.html'
})
export class AuthLoginComponent {
    name: string;
    password: string;
    errorMessage: string;

    constructor(private _authService: AuthService) {
    }

    loginUser() {
        this._authService.loginUser(this.name, this.password)
        .subscribe(name => this.name = name,
        error => this.errorMessage = <any>error);
    }
}