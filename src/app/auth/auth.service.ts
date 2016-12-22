import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private _authUrl = 'http://127.0.0.1:8000/api/auth/';

    constructor(private _http: Http){}

    registerUser(name: string, password: string) {
        return this._http.post(this._authUrl+"register", {name, password})
        .map((response:Response) => response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    loginUser(name: string, password: string) {
        return this._http.post(this._authUrl+"login", {name, password})
        .map((response:Response) => response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
