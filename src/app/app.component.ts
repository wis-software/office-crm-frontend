import { Component } from '@angular/core';

// Apollo & GQL
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

// Other
import { CurrentUserService } from './shared';


@Component({
  selector: 'ws-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(public user: CurrentUserService,
              private _apollo: Apollo) {

  }

  public testRequest() {
    this._apollo
      .query({
        fetchPolicy: 'network-only',
        query: gql`
            query loadEmployees {
              employees {
                id,
                firstName,
                lastName,
                position {
                  id,
                  name
                }
              }
            }`
      })
      .map((response: ApolloQueryResult<any>) => {
        return response.data.employees;
      })
      .subscribe((data: any) => {
        alert('Ok');
        console.log(data);
      }, (error) => {
        alert('Error');
        console.error('Receiving user data error', error);
      });
  }
}
