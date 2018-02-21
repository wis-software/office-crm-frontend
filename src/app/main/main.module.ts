import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from '../app.routing';

import { ProfileService } from './components/profile/profile.service';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale'

defineLocale('en-gb', enGbLocale);

@NgModule({
  declarations: [
    MainMenuComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    BsDatepickerModule.forRoot()
  ],
  providers: [ ProfileService ],
  bootstrap: [ MainComponent ],
  exports: [ MainComponent ]
})

export class MainModule { }
