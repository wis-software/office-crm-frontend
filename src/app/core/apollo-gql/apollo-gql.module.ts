import { NgModule } from '@angular/core';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


@NgModule({
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const cache = new InMemoryCache({ addTypename: false });
      const link = httpLink.create({ uri: '/graphql/' });

      return {
        link,
        cache,
        defaultOptions: {
          query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
          },
        },
      };
    },
    deps: [ HttpLink ]
  }],
  exports: [
    ApolloModule,
    HttpLinkModule,
  ],
})
export class ApolloGqlModule {
}
