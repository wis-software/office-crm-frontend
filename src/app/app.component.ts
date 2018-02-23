import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';


@Component({
  selector: 'ws-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(private _apollo: Apollo) {

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
