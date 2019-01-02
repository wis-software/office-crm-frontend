import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments';
import { AuthService } from '../services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _authService: AuthService;

  constructor(private _injector: Injector) {}

  public intercept(request: HttpRequest<any>, handler: HttpHandler) {
    if (!this._authService) {
      this._authService = this._injector.get(AuthService);
    }

    // If not api url then do usual request
    if (!request.url.includes(environment.apiUrl)) {
      return handler.handle(request);
    }

    // Refresh token if it is expired
    if (this._authService.isTokenExpired) {
      return this._authService
        .refreshToken()
        .pipe(
          catchError(() => {
            this._authService.logout();
            return throwError('400 Could not refresh token');
          }),
          switchMap(() => this.handler(request, handler)),
        );
    }

    return this.handler(request, handler);
  }

  private handler(request: HttpRequest<any>, handler: HttpHandler) {
    return handler
      .handle(this.addToken(request))
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this._authService.logout();
            return throwError('401 Unauthorized');
          }

          return throwError(error);
        }),
      );
  }

  private addToken(request: HttpRequest<any>) {
    const token = this._authService.jwtToken;

    if (token) {
      return request.clone({
        setHeaders: { Authorization: token },
      });
    }

    return request;
  }

}
