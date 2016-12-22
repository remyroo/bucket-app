import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist } from './bucketlist';


@Component({
    templateUrl: './bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit {
    bucketlist: IBucketlist;
    name: string;
    done: boolean;
    updatedName: string;
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

    createItem(): void {
        this._bucketlistService.createItem(this.id, this.name)
            .subscribe(result => {
                console.log('Item created')
            })
    }

    updateItem(item_id: number, name: string, done: boolean): void {
        if(name != this.updatedName) {
        this._bucketlistService.updateItemName(this.id, item_id, this.updatedName)
            .subscribe(result => {
                console.log('Item name updated')
            });
        }
        else if(done != this.done) {
        this._bucketlistService.updateItemDone(this.id, item_id, this.done)
            .subscribe(result => {
                console.log('Item done updated')
            });
        }
    }

    deleteItem(item_id: number): void {
        this._bucketlistService.deleteItem(this.id, item_id)
            .subscribe(result => {
                console.log('Item deleted')
            })
    }

    onEdit(name: string, done: boolean): void {
        this.updatedName = name;
        this.done = done;
    }
}
