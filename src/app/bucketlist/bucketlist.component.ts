import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist, IData } from './bucketlist';


@Component({
    templateUrl: './bucketlist.component.html'
})
export class BucketlistComponent implements OnInit {
    bucketlists: IBucketlist[];
    data: IData;
    name: string;
    errorMessage: string;

    constructor(private _bucketlistService: BucketlistService,
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._bucketlistService.getAllBucketlists()
            .subscribe(data => {
                this.data = data;
                this.bucketlists = data.results;
            },
            error => this.errorMessage = <any>error);
        
    }
    createBucketlist(): void {
        this._bucketlistService.createBucketlist(this.name)
            .subscribe(result => {
                console.log('Bucketlist created')
            })
    }

    updateBucketlist(id: number): void {
        this._bucketlistService.updateBucketlist(id, this.name)
            .subscribe(result => {
                console.log('Bucketlist updated')
            })
    }

    deleteBucketlist(id: number): void {
        this._bucketlistService.deleteBucketlist(id)
            .subscribe(result => {
                console.log('Bucketlist deleted')
            })
    }

    onEdit(name: string, done: boolean): void {
        this.name = name;
    }
}
