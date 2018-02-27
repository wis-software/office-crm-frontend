import { NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { concat } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { authMiddleware } from './apollo-links';

@NgModule({
  imports: [
  ],

  exports: [
    HttpLinkModule
  ],
})
export class ApolloGqlModule {

  constructor(private _apollo: Apollo,
              private _httpLink: HttpLink) {

    const http = _httpLink.create({
      uri: 'https://office-manager-test.herokuapp.com/graphql/'
    });

    const link = concat(authMiddleware, http);
    const cache = new InMemoryCache({ addTypename: false });

    _apollo.create({
      link,
      cache,
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
      }
    });
  }
}
