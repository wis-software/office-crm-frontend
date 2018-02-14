import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { GraphQLModule } from './apollo.config';

import { AppComponent } from './app.component';

// Router
import { routing, routingComponents } from './app.routing';

import '../styles/vendor.scss';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Modules
    BrowserModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule,
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
