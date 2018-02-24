import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

// Apollo & GQL
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

// Other
import { CurrentUserService } from '../../shared';
import { JwtHelper } from '../helpers';


@Injectable()
export class AuthService {

  public isAuth = false;
  public isUserLoaded = false;
  public currentUser: CurrentUserService;
  public token = '';

  private _jwtHelper = new JwtHelper();

  constructor(@Inject(CurrentUserService) user,
              private _http: HttpClient,
              private _apollo: Apollo) {
    this.currentUser = user;
  }


  /**
   * Login using login and pass via
   * authentication: Barear base64(login:pass)
   * Then store obtained jwt into cookies
   */
  public login(username, password): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const request = this._http
        .post('https://office-manager-test.herokuapp.com/api-token-auth/', { // TODO remove host
          username: username,
          password: password
        })
        .map((response: any) => {
          return response.token;
        });

      request.subscribe((token) => {

        this.setToken(token);
        this.isAuth = true;

        observer.next(true);
      });
    });
  }

  /**
   * Clear all cookies
   */
  public logout(): Observable<any> {
    return Observable.create((observer) => {
      localStorage.removeItem('jwt'); // remove token from localStorage
      this._apollo.getClient().resetStore();
      this.currentUser.reset();
      this.isUserLoaded = false;
      observer.next();
      observer.complete();
    });
  }

  /**
   * Set token and update everything what depends from token
   * @param {string} token
   */
  public setToken(token: string) {
    localStorage.setItem('jwt', token);
    this.token = token;

    const tokenInfo = this._jwtHelper.decodeToken(this.token);

    if (tokenInfo) {
      this.currentUser.updateUser(tokenInfo);
    } else {
      this.logout();
    }
  }

  /**
   * Update existing token
   * @param {string} token
   */
  public updateToken(token: string) {
    localStorage.setItem('jwt', token);
    this.token = token;

    const tokenInfo = this._jwtHelper.decodeToken(this.token);

    if (tokenInfo) {
      this.currentUser.expired = tokenInfo.exp;
    } else {
      this.logout();
    }
  }

  /**
   * Read token from local storage and set
   * @returns {boolean}
   */
  public readToken() {
    const token = localStorage.getItem('jwt');

    if (token) {
      this.setToken(token);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Check if token expired
   * @returns {boolean | boolean}
   */
  public isTokenExpired() {
    return (this.token) // We need this check because helper.isTokenExpired require only string
      ? this._jwtHelper.isTokenExpired(this.token)
      : true;
  }

  /**
   * Refresh token from the server
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const request = this._http
        .post('https://office-manager-test.herokuapp.com/api-token-refresh/', { // TODO remove host
          token: this.token
        })
        .map((response: any) => {
          return response.token;
        });

      request.subscribe((token) => {

        this.updateToken(token);
        observer.next(true);
      }, () => {
          observer.next(false)
        }
      );
    });
  }

  /**
   * Load active user
   * @returns {Observable<any>}
   */
  public loadUser() {
    return this._apollo
      .query({
        fetchPolicy: 'network-only',
        query: gql`
            query loadEmployees($id: Float) {
              employees(id: $id) {
                id,
                firstName,
                lastName,
                position {
                  id,
                  name
                }
              }
            }`,
        variables: { id: this.currentUser.userId }
      })
      .map((response: ApolloQueryResult<any>) => {
        return response.data.employees;
      })
      .do((response) => {
        if (response[0]) {
          this.currentUser.updateUser(response[0]);
          this.isUserLoaded = true;
        }
      });
  }
}
