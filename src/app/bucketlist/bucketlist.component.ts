import { Component, OnInit } from '@angular/core';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist } from './bucketlist';


@Component({
    templateUrl: './bucketlist.component.html'
})
export class BucketlistComponent implements OnInit {
    bucketlists: IBucketlist[];
    errorMessage: string;

    constructor(private _bucketlistService: BucketlistService) {
    }

    ngOnInit(): void {
        this._bucketlistService.getAllBucketlists()
            .subscribe(bucketlists => this.bucketlists = bucketlists,
            error => this.errorMessage = <any>error);
    }
}
