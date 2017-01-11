import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { AuthUserComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { BucketlistDetailComponent } from './bucketlist/bucketlist-detail.component';
import { BucketlistService } from './bucketlist/bucketlist.service';
import { BucketlistGuard } from './bucketlist/bucketlist-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthUserComponent,
    BucketlistComponent,
    BucketlistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    ToastModule,
    RouterModule.forRoot([
      {path: 'auth/user', component: AuthUserComponent},
      {path: 'bucket', component: BucketlistComponent},
      {path: 'bucket/:id', 
            canActivate: [ BucketlistGuard ],
            component: BucketlistDetailComponent},
      {path: '', redirectTo: 'auth/user', pathMatch: 'full'},
      {path: '**', redirectTo: 'bucket', pathMatch: 'full'}
    ]),
  ],
  providers: [ AuthService, BucketlistService, BucketlistGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
