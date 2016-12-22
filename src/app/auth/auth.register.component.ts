import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
    templateUrl: './auth.component.html'
})
export class AuthRegisterComponent {
    name: string;
    password: string;
    user: string;
    errorMessage: string;

    constructor(private _authService: AuthService) {
    }

    ngOnSubmit(): void {
        let user = +this._route.snapshot.params['id'];
        this._authService.registerUser(this.name, this.password)
            .subscribe(user => this.user = user,
            error => this.errorMessage = <any>error);
    }
}
