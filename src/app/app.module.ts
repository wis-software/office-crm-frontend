import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth';
import { ApolloGqlModule } from './apollo-gql';

import { SharedModule } from './shared/shared.module';
import { CurrentUserService } from './shared';

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
    ApolloGqlModule,
    AuthModule,
    HttpClientModule,

    // Routes
    routing,
  ],
  declarations: [
    AppComponent,

    // Router components
    routingComponents,
  ],
  providers: [
    CurrentUserService,
  ]
})

export class AppModule {
}
