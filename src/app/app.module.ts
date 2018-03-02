import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { AuthModule } from './auth';
import { CoreModule } from './core';
import { AdminComponent } from './admin';
import { SharedModule } from './shared';

import '../styles/vendor.scss';


@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    SharedModule,
    CoreModule,
    AuthModule,

    AppRouting,
  ],
  declarations: [
    AppComponent,
    AdminComponent,
  ],
})
export class AppModule {}
