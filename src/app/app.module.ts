import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/auth.login.component';
import { AuthRegisterComponent } from './auth/auth.register.component';
import { AuthService } from './auth/auth.service';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { BucketlistDetailComponent } from './bucketlist/bucketlist-detail.component';
import { BucketlistService } from './bucketlist/bucketlist.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    BucketlistComponent,
    BucketlistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'login', component: AuthLoginComponent},
      {path: 'register', component: AuthRegisterComponent},
      {path: 'bucket', component: BucketlistComponent},
      {path: 'bucket/:id', component: BucketlistDetailComponent},
      {path: '**', redirectTo: 'bucket', pathMatch: 'full'}
    ]),
  ],
  providers: [ BucketlistService,  AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
