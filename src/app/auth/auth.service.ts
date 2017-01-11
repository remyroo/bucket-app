import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private _authUrl = 'https://cp3-api.herokuapp.com/api/auth/';
    private _headers: Headers;

    constructor(private _http: Http){
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json')
    }

    registerUser(username: string, password: string) {
        return this._http.post(this._authUrl+"register", JSON.stringify({username, password}), {headers:this._headers})
        .map((response:Response) => response.json())
        .catch(this.handleError);
    }

    loginUser(username: string, password: string) {
        return this._http.post(this._authUrl+"login", JSON.stringify({username, password}), {headers:this._headers})
        .map((response:Response)=>{
            localStorage.setItem('token', response.json().token);
        })
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
