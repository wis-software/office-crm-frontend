import { Component } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import { map } from 'rxjs/operators';

import { AuthService } from '../auth/services';
import { CurrentUserService } from '../core/services';


@Component({
  selector: 'wis-admin',
  templateUrl: 'admin.component.html',
})
export class AdminComponent {

  constructor(
    private _apollo: Apollo,
    private _authService: AuthService,
    private _currentUserService: CurrentUserService,
  ) {}

  get user() {
    return this._currentUserService;
  }

  public logout() {
    this._authService.logout();
  }

  public refreshToken() {
    this._authService.refreshToken().subscribe(() => {
      alert('Token has been refreshed');
    });
  }

  public testRequest() {
    this._apollo
      .query({
        query: gql`
          query testRequest {
            employees {
              id,
              firstName,
              lastName,
            }
          }
        `,
      })
      .pipe(
        map((response: ApolloQueryResult<any>) => response.data.employees),
      )
      .subscribe({
        next: (employees) => {
          alert('Ok');
          console.log(employees);
        },
        error: (error) => {
          alert('Error');
          console.error('Receiving user data error', error);
        },
      });
  }

}
