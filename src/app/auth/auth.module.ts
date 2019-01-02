import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AuthGuard } from './guards';
import { LoginComponent } from './components';
import { AuthInterceptor } from './interceptors';
import { AuthService } from './services';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AuthModule {}
