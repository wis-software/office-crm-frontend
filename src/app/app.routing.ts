import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routingComponents = [
  AppComponent
];

export const routing = RouterModule.forRoot(
  routes,
  { preloadingStrategy: PreloadAllModules },
);
