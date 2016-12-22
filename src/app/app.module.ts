import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthUserComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { BucketlistDetailComponent } from './bucketlist/bucketlist-detail.component';
import { BucketlistService } from './bucketlist/bucketlist.service';

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
    RouterModule.forRoot([
      {path: 'auth/user', component: AuthUserComponent},
      {path: 'bucket', component: BucketlistComponent},
      {path: 'bucket/:id', component: BucketlistDetailComponent},
      {path: '**', redirectTo: 'bucket', pathMatch: 'full'}
    ]),
  ],
  providers: [ BucketlistService,  AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
