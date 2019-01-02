import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { AuthModule } from './auth';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { LayoutModule } from './layout';


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
    LayoutModule,

    AppRouting,
  ],
  declarations: [
    AppComponent,
  ],
})
export class AppModule {}
