import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthService } from './auth.service';


@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthUserComponent {
    username: string;
    password: string;

    constructor(private _router: Router,
                private _authService: AuthService,
                public toastr: ToastsManager) {
    }

    registerUser(): void{
        // handles user sign-up, uses toastr to raise flash messages
        this._authService.registerUser(this.username, this.password)
            .subscribe(result => {
                this.toastr.success('Go ahead and log in', 'Success!');
                this._router.navigate(['auth/user'])
            },
            error => {this.toastr.error('Please enter a valid username and password!', 'Try Again!');}
            );
        }

    loginUser(): void {
        this._authService.loginUser(this.username, this.password)
            .subscribe(result => {
                this._router.navigate(['bucket']);
            },
            error => {
                if(error.non_field_errors) {
                    this.toastr.error('Please enter a valid username and password!', 'Try Again!');
                }
                else if(error) {
                    this.toastr.error('Please enter a valid username and password!', 'Try Again!');
                }
            }
            );}
}
