import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist, IData } from './bucketlist';


@Component({
    templateUrl: './bucketlist.component.html',
    styleUrls: ['./bucketlist.component.css']
})
export class BucketlistComponent implements OnInit {
    bucketlists: IBucketlist[];
    data: IData;
    name: string;
    currentName: string;

    constructor(private _bucketlistService: BucketlistService,
                private _router: Router,
                private _route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit(): void {
        // populates the page with user's bucketlists from db
        this._bucketlistService.getAllBucketlists()
            .subscribe(data => {
                this.data = data;
                this.bucketlists = data.results;
                this.toastr.info("Click on a bucket's name to see its items.");
            },
            // redirects unauthorised user back to login page
            error => {this.toastr.error('You must login to see your bucketlists.', 'Oops!');
            this._router.navigate(['auth/user'])}
        );
    }

    createBucketlist(): void {
        // handles bucketlist creation, uses toastr to raise flash messages
        this._bucketlistService.createBucketlist(this.name)
            .subscribe(result => {
                console.log('Bucketlist created'); 
                this.toastr.success(this.name + ' has been created', 'Success!');
                this.name=""; // clears the input field on submit
                this.bucketlists.push(result) // updates the data on the screen
            },
        error => {
            if(error.name) {
                this.toastr.error('Please enter a valid bucket name.', 'Try Again!');
            }
            else if(error.non_field_errors) {
                this.toastr.error(this.name + ' already exists.', 'Try Again!');
            }
        });
    }

    updateBucketlist(id: number, name: string, index: number): void {
        this._bucketlistService.updateBucketlist(id, name)
            .subscribe(result => {
                console.log('Bucketlist updated');
                this.toastr.success('Update successful');
            },
        error => {
            if(error.non_field_errors) {
                this.bucketlists[index].name = this.currentName; // reverts duplicate value to original pre-edit value
                this.toastr.error(name + ' already exists.', 'Try Again!')
            }
            ;});
    }

    deleteBucketlist(id: number, index: number): void {
        this._bucketlistService.deleteBucketlist(id)
            .subscribe(result => {
                console.log('Delete successful');
                this.bucketlists.splice(index, 1); // updates the data on the screen 
                this.toastr.success('Delete successful');
            })
    }

    onEdit(name: string): void {
        // stores current name value before name field is edited
        this.currentName = name;
    }

    cancelEdit(index: number): void {
        // reverts to the pre-edit name value when modal is closed
        this.bucketlists[index].name = this.currentName;
    }
}
