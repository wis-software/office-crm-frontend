import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';

import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import { CurrentUserService } from '../../../core/services';
import { AuthService } from '../../../auth/services';


@Component({
  selector: 'wis-layout',
  templateUrl: './layout.component.html',
  providers: [
    CurrentUserService,

  ],
})
export class LayoutComponent implements OnInit {

  constructor(
    private _apollo: Apollo,
    private _authService: AuthService,
    private _currentUserService: CurrentUserService,
  ) {}

  get user() {
    return this._currentUserService;
  }

  public ngOnInit() {}

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
