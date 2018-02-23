import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './main/components/profile/profile.component';
import { AuthorisationComponent } from './auth/components/authorisation.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: AuthorisationComponent
  }
];

export const routingComponents = [
  AppComponent
];

export const routing = RouterModule.forRoot(
  routes,
  { preloadingStrategy: PreloadAllModules },
);
