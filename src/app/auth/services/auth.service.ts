import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class AuthService {

  constructor(private _http: HttpClient,
              private _apollo: Apollo) {}

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

        localStorage.setItem('jwt', token);

        observer.next(token);
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
      observer.next();
      observer.complete();
    });
  }

}
