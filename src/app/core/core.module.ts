import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApolloGqlModule } from './apollo-gql';
import { APIInterceptor } from './interceptors';


@NgModule({
  imports: [
    ApolloGqlModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
