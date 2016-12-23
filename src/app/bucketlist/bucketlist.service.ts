import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IBucketlist, IItem, IData } from './bucketlist';

@Injectable()
export class BucketlistService {
    private _bucketlistUrl = 'http://127.0.0.1:8000/api/bucket/';
    private headers: Headers;
    private token: string = localStorage.getItem('token');

    constructor(private _http: Http){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json')
        this.headers.append('Authorization', 'JWT ' + this.token)
    }

    getAllBucketlists(): Observable<IData> {
        return this._http.get(this._bucketlistUrl, {headers:this.headers})
        .map((response:Response) => <IData>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getBucketlist(id: number): Observable<IBucketlist> {
        return this._http.get(this._bucketlistUrl+id+'/', {headers:this.headers})
        .map((response:Response) => <IBucketlist>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    createBucketlist(name: string): Observable<IBucketlist> {
        return this._http.post(this._bucketlistUrl, {name}, {headers:this.headers})
        .map((response:Response) => <IBucketlist>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    updateBucketlist(id: number, name: string): Observable<IBucketlist> {
        return this._http.put(this._bucketlistUrl+id+'/', {name}, {headers:this.headers})
        .map((response:Response) => <IBucketlist>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    deleteBucketlist(id: number): Observable<any> {
        return this._http.delete(this._bucketlistUrl+id+'/', {headers:this.headers})
        .map((response:Response) => response.status)
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    createItem(id: number, name: string): Observable<IItem> {
        return this._http.post(this._bucketlistUrl+id+"/items/", {name}, {headers:this.headers})
        .map((response:Response) => <IItem>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    updateItemName(id: number, itemId: number, name: string): Observable<IItem> {
        return this._http.put(this._bucketlistUrl+id+"/items/"+itemId+'/', {name}, {headers:this.headers})
        .map((response:Response) => <IItem>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    updateItemDone(id: number, itemId: number, done: boolean): Observable<IItem> {
        return this._http.patch(this._bucketlistUrl+id+"/items/"+itemId+'/', {done}, {headers:this.headers})
        .map((response:Response) => <IItem>response.json())
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    deleteItem(id: number, itemId: number): Observable<any> {
        return this._http.delete(this._bucketlistUrl+id+"/items/"+itemId+'/', {headers:this.headers})
        .map((response:Response) => response.status)
        .do(data => console.log('Data: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error.json());
        return Observable.throw(error.json() || 'Server error');
    }
}
