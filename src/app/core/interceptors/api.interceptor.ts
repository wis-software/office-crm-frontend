import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments';


@Injectable()
export class APIInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, handler: HttpHandler) {
    if (
      request.url.includes('http://')
      || request.url.includes('https://')
    ) {
      return handler.handle(request);
    }

    return handler.handle(this.addApiUrl(request));
  }

  private addApiUrl(request) {
    return request.clone({
      url: environment.apiUrl + request.url,
    });
  }

}
