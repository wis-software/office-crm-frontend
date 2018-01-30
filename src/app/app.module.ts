import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// Router
import { routing, routingComponents } from './app.routing';

import '../styles/vendor.scss';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Modules
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    MainModule,
    // Routes
    routing,
  ],
  declarations: [
    AppComponent,
    // Router components
    routingComponents,
  ],
})

export class AppModule {

}
