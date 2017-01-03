import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist, IData } from './bucketlist';


@Component({
    templateUrl: './bucketlist.component.html'
})
export class BucketlistComponent implements OnInit {
    bucketlists: IBucketlist[];
    data: IData;
    name: string;
    currentName: string;
    errorBlank = false;
    errorDuplicate = false;

    constructor(private _bucketlistService: BucketlistService,
                private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // populates the page with user's bucketlists from db
        this._bucketlistService.getAllBucketlists()
            .subscribe(data => {
                this.data = data;
                this.bucketlists = data.results;
            },
            // redirects unauthorised user back to login page
            error => {alert("You must register or login to see this page.")
            this._router.navigate(['auth/user'])}
        );
    }

    createBucketlist(): void {
        this._bucketlistService.createBucketlist(this.name)
            .subscribe(result => {
                console.log('Bucketlist created');
                this.bucketlists.push(result)
            },
        error => {
            if(error.name) {
                this.errorBlank = true;
            }
            else if(error.non_field_errors) {
                this.errorDuplicate = true;
            }
            ;});
    }

    updateBucketlist(id: number, name: string, index: any): void {
        this._bucketlistService.updateBucketlist(id, name)
            .subscribe(result => {
                console.log('Bucketlist updated');
            },
        error => {
            if(error.non_field_errors) {
                this.bucketlists[index].name = this.currentName; // reverts duplicate value to original pre-edit value
                this.errorDuplicate = true;
            }
            ;});
    }

    deleteBucketlist(id: number): void {
        this._bucketlistService.deleteBucketlist(id)
            .subscribe(result => {
                console.log('Bucketlist deleted');
                this.bucketlists.pop()
            })
    }

    onEdit(name: string): void {
        // stores current values before they're fields are edited
        this.currentName = name;
    }

    cancelEdit(index): void {
        // reverts to the pre-edit value when modal is closed
        this.bucketlists[index].name = this.currentName;
    }
}
