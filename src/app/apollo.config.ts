import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { ApolloLink, concat } from 'apollo-link';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
})
export class GraphQLModule {

  constructor(private _apollo: Apollo,
              private _httpLink: HttpLink) {

    const http = _httpLink.create({
      uri: 'https://office-manager-test.herokuapp.com/graphql/'
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization',
          'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTE5NzI1NTM5LCJlbWFpbCI6ImUuY2hhdHprb0B3aXMuZXUuY29tIiwib3JpZ19pYXQiOjE1MTk3MjE5Mzl9.exIylycSQcCn8rTwCpx20FmSohisuk2mMcC6bFTkkts')
      });
      return forward(operation);
    });

    // const logoutLink = onError(({ networkError }) => {
    //   if (networkError.statusCode === 401) {
    //     window.location.href = '/login';
    //   }
    // });

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
