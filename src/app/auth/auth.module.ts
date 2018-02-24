import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { AuthGuard } from './guards';

import { LoginComponent } from './components';
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
    AuthGuard
  ]
})
export class AuthModule {
}
