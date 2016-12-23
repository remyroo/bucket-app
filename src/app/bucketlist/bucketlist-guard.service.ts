import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class BucketlistGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        // if id param is incorrect, abort and send alert
        if (isNaN(id) || id<1) {
            alert('Invalid id');
            this._router.navigate(['bucket'])
            return false;
        };
        return true;
    }

}