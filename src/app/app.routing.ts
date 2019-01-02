import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components';
import { AuthGuard } from './auth/guards';
import { LayoutComponent } from './layout';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
