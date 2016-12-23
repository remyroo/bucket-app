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
            error => {alert(error)}
        );
    }

    createBucketlist(): void {
        this._bucketlistService.createBucketlist(this.name)
            .subscribe(result => {
                console.log('Bucketlist created')
            },
        error => {
            if(error.name) {
                alert('Please enter a name')
            }
            else if(error.non_field_errors) {
                alert(error.non_field_errors[0])
            }
            ;});
    }

    updateBucketlist(id: number): void {
        this._bucketlistService.updateBucketlist(id, this.name)
            .subscribe(result => {
                console.log('Bucketlist updated')
            },
        error => {
            if(error.name) {
                alert('Please enter a name')
            }
            else if(error.non_field_errors) {
                alert(error.non_field_errors[0])
            }
            ;});
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
