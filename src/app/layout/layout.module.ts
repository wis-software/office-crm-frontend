import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LayoutComponent } from './components';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
  ],
})
export class LayoutModule {
}
