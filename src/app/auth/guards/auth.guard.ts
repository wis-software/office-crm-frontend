import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { _throw as throwError } from 'rxjs/observable/throw';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../services';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService) {}

  public canActivate() {
    if (this._authService.token) {
      return this._authService
        .loadCurrentUser()
        .pipe(
          catchError(() => throwError(false)),
          switchMap(() => of(true)),
        );
    }

    this._authService.logout();
    return false;
  }

}
