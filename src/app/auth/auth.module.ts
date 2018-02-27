import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services';

@NgModule({
  imports: [
    SharedModule,
  ],

  declarations: [
    LoginComponent,
  ],

  providers: [
    AuthService
  ]
})
export class AuthModule {
}
