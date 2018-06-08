import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthenticationModule,
    HomeModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [AppComponent],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
