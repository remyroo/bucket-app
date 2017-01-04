import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

   constructor(private _router: Router) {
   }

  userStatus(): boolean {
    // checks if a user is logged in for the Logout button
    if (localStorage.getItem('token')) {
      return this.isLoggedIn = true;
    }
    else {
      return this.isLoggedIn = false;
    }
  }

  logoutUser() {
    // deletes the token and redirects back to login page
      localStorage.removeItem('token');
      window.location.reload();
      this._router.navigate(['auth/user']);
    }

  }
