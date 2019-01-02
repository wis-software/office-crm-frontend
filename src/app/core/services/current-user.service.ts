import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Alias } from 'tsmodels';

import { EmployeeModel } from '../../shared/models';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../auth/services';


@Injectable()
export class CurrentUserService extends EmployeeModel {

  public loaded = false;
  @Alias('exp') public expired: string;

  constructor(
    private _authService: AuthService,
    private _apollo: Apollo,
  ) {
    super();

    this.loadCurrentUser()
      .subscribe(() => {
        this.loaded = true;
      });
  }

  /**
   * Load active user
   * @returns {Observable<EmployeeModel>}
   */
  public loadCurrentUser() {
    return this._apollo
      .query({
        query: gql`
          query loadCurrentUser {
            currentEmployee {
              id,
              firstName,
              lastName,
            }
          }
        `,
      })
      .pipe(
        map((response: ApolloQueryResult<any>) => response.data.currentEmployee),
        tap((currentUser) => this.updateUser(currentUser)),
      );
  }

  public updateUser(data: any = {}) {
    if (data.username) {
      this.username = data.username;
    }

    if (data.exp) {
      this.expired = data.exp;
    }

    if (data.firstName) {
      this.firstName = data.firstName;
    }

    if (data.lastName) {
      this.lastName = data.lastName;
    }
  }

  public logout() {
    this._authService.logout();
  }
}
