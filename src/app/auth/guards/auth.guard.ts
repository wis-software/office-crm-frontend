import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, Observer } from 'rxjs';

import { AuthService } from '../services';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
    this.auth.readToken();
  }

  public canActivate() {
    const auth = this.auth;

    if (auth.isAuth && auth.isUserLoaded) {
      return true;
    }

    return Observable.create((observer: Observer<any>) => { // TODO simplify this method
      if (auth.token && auth.isTokenExpired()) {
        auth.refreshToken().subscribe((result) => {
          if (result) {
            auth.loadUser().subscribe(() => {
              observer.next(true);
            }, () => {
              observer.next(false);
              this.auth.isAuth = false;
            })
          } else {
            this.auth.isAuth = false;
            this.router.navigate(['login']);
            observer.next(false);
          }
        })
      } else if (auth.token) {
        auth.loadUser().subscribe(() => {
          observer.next(true);
        }, () => {
          observer.next(false);
          this.auth.isAuth = false;
        })
      } else {
        this.router.navigate(['login']);
        observer.next(false);
      }
    }).take(1);
  }
}
