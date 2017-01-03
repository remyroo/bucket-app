import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BucketlistService } from './bucketlist.service';
import { IBucketlist } from './bucketlist';


@Component({
    templateUrl: './bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit {
    bucketlist: IBucketlist;
    name: string;
    done: boolean;
    currentName: string;
    currentDone: boolean;
    id: number = +this._route.snapshot.params['id'];
    errorDuplicate = false;
    errorBlank = false;

    constructor(private _bucketlistService: BucketlistService,
                private _router: Router, 
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._bucketlistService.getBucketlist(this.id)
            .subscribe((bucketlist) => {
                this.bucketlist = bucketlist
            },
            error => {alert("You must register or login to see this page.")
            this._router.navigate(['auth/user'])}
        );
        
    }

    createItem(): void {
        this._bucketlistService.createItem(this.id, this.name)
            .subscribe(result => {
                console.log('Item created')
                this.bucketlist.items.push(result)
            },
            error => {
                if(error.name && error.name[0] == 'This field is required.') {
                    this.errorBlank = true;
                }
                if(error.name && error.name[0] == 'This field may not be blank.') {
                    this.errorBlank = true;
                }
                else if(error.name && error.name[0] == 'This item already exists.') {
                    this.errorDuplicate = true;
                }
            }
        );
    }

    updateItem(item_id: number, name: string, done: boolean, index: any): void {
        // checks if a field has changed to determine which function to call
        if(name != this.currentName) {
        this._bucketlistService.updateItemName(this.id, item_id, name)
            .subscribe(result => {
                console.log('Item name updated')
            },
            error => {
                if(error.name && error.name[0] == 'This item already exists.') {
                        this.bucketlist.items[index].name = this.currentName; // reverts duplicate value to original pre-edit value
                        this.errorDuplicate = true;
                    }
            });
        }
        else if(done != this.currentDone) {
        this._bucketlistService.updateItemDone(this.id, item_id, done)
            .subscribe(result => {
                console.log('Item done updated')
            });
        }
    }

    deleteItem(item_id: number): void {
        this._bucketlistService.deleteItem(this.id, item_id)
            .subscribe(result => {
                console.log('Item deleted')
                this.bucketlist.items.pop()
            })
    }

    onEdit(name: string, done: boolean): void {
        // stores current values before they're fields are edited
        this.currentName = name;
        this.currentDone = done;
    }

    cancelEdit(index): void {
        // reverts to the pre-edit value when modal is closed
        this.bucketlist.items[index].name = this.currentName;
    }
}
