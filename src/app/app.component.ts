import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private _router: Router,
              public toastr: ToastsManager, 
              vRef: ViewContainerRef) {
                this.toastr.setRootViewContainerRef(vRef)
              }

  userStatus(): boolean {
    // checks if a user is logged in to
    // toggle on/off the Logout button from the header
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
