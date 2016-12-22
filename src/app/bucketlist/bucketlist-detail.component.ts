import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist } from './bucketlist';


@Component({
    templateUrl: './bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit {
    bucketlist: IBucketlist;
    errorMessage: string;

    constructor(private _bucketlistService: BucketlistService, 
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id'];
        this._bucketlistService.getBucketlist(id)
            .subscribe(bucketlist => this.bucketlist = bucketlist,
            error => this.errorMessage = <any>error);
    }
}
