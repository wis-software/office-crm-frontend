import { NgModule } from '@angular/core';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule,
  ],
})
export class ApolloGqlModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    const cache = new InMemoryCache({ addTypename: false });
    const link = httpLink.create({ uri: '/graphql/' });

    apollo.create({
      link,
      cache,
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
      },
    });
  }

}
