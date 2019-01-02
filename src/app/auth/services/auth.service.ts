import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtHelper } from '../helpers';


const TOKEN_PREFIX = 'JWT';


@Injectable()
export class AuthService {

  private _token: string;
  private _jwtHelper = new JwtHelper();

  constructor(
    private _httpClient: HttpClient,
    private _apollo: Apollo,
    private _router: Router,
  ) {
    const token = localStorage.getItem(TOKEN_PREFIX);

    if (token) {
      this.setToken(token);
    }
  }

  /**
   * Current token
   * @return {string}
   */
  get token() {
    return this._token;
  }

  /**
   * Token with jwt prefix
   * @return {string}
   */
  get jwtToken() {
    return (this.token) ? `${TOKEN_PREFIX} ${this.token}` : void 0;
  }

  /**
   * Check if token expired
   * @returns {boolean}
   */
  get isTokenExpired() {
    return (this.token) ? this._jwtHelper.isTokenExpired(this.token) : void 0;
  }

  /**
   * Login using login and pass via
   * authentication: Barear base64(login:pass)
   * Then store obtained jwt into cookies
   * @param {string} username
   * @param {string} password
   * @return {Observable<string>}
   */
  public login(username: string, password: string): Observable<string> {
    return this._httpClient
      .post('/api-token-auth/', {
        username: username,
        password: password,
      })
      .pipe(
        map((response: any) => response.token),
        tap((token) => this.setToken(token)),
      );
  }

  /**
   * Clear all cookies
   */
  public logout() {
    this._token = void 0;
    localStorage.removeItem(TOKEN_PREFIX);

    this._apollo.getClient().resetStore();
    this._router.navigate(['login']);
  }

  /**
   * Refresh token from the server
   * @returns {Observable<string>}
   */
  public refreshToken(): Observable<string> {
    return this._httpClient
      .post('/api-token-refresh/', {
        token: this._token,
      })
      .pipe(
        map((response: any) => response.token),
        tap({
          next: (token) => this.setToken(token),
          error: () => this.logout(),
        }),
      );
  }

  /**
   * Set token and update everything what depends from token
   * @param {string} token
   */
  private setToken(token: string) {
    const tokenInfo = this._jwtHelper.decodeToken(token);

    if (tokenInfo) {
      this._token = token;
      localStorage.setItem(TOKEN_PREFIX, this._token);
    } else {
      this.logout();
    }
  }
}
