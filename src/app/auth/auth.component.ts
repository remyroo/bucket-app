import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';


@Component({
    templateUrl: './auth.component.html'
})
export class AuthUserComponent {
    username: string;
    password: string;
    errorMessage: string;

    constructor(private router: Router, private _authService: AuthService) {
    }

    registerUser(): void{
        this._authService.registerUser(this.username, this.password)
            .subscribe(result => {
                this.router.navigate(['bucket'])
            },
            error => this.errorMessage = <any>error);
    }

    loginUser() {
        this._authService.loginUser(this.username, this.password)
            .subscribe(result => {
                this.router.navigate(['bucket']);
            },
            error => this.errorMessage = <any>error);
    }
}
