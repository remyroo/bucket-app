import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist } from './bucketlist';


@Component({
    templateUrl: './bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit {
    bucketlist: IBucketlist;
    done: boolean;
    name: string;
    id: number = +this._route.snapshot.params['id'];
    errorMessage: string;

    constructor(private _bucketlistService: BucketlistService, 
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._bucketlistService.getBucketlist(this.id)
            .subscribe(bucketlist => this.bucketlist = bucketlist,
            error => this.errorMessage = <any>error);
    }

    updateBucketlist(): void {
        this._bucketlistService.updateBucketlist(this.id, this.name)
            .subscribe(result => {
                console.log('Bucketlist updated')
            })
    }

    createItem(): void {
        this._bucketlistService.createItem(this.id, this.name)
            .subscribe(result => {
                console.log('Item created')
            })
    }

    updateItemName(item_id: number): void {
        this._bucketlistService.updateItemName(this.id, item_id, this.name)
            .subscribe(result => {
                console.log('Item name updated')
            })
    }

    updateItemDone(item_id: number): void {
        this._bucketlistService.updateItemDone(this.id, item_id, this.done)
            .subscribe(result => {
                console.log('Item done updated')
            })
    }

    deleteItem(item_id: number): void {
        this._bucketlistService.deleteItem(this.id, item_id)
            .subscribe(result => {
                console.log('Item deleted')
            })
    }
}
