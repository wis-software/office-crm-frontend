import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Apollo
import { ApolloModule } from 'apollo-angular';


@NgModule({
  imports: [
    // Modules
  ],

  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    ApolloModule,
  ]
})
export class SharedModule {
}
