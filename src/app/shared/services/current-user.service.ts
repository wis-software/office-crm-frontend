import { Injectable } from '@angular/core';
import { Alias } from 'tsmodels';

import { EmployeeModel } from '../models';


@Injectable()
export class CurrentUserService extends EmployeeModel {

  @Alias('exp') public expired: string;

  constructor() {
    super();
  }

  public updateUser(data: any = {}) {
    if (data.email) {
      this.email = data.email;
    }

    if (data.user_id) {
      this.userId = data.user_id;
    }

    if (data.username) {
      this.username = data.username;
    }

    if (data.exp) {
      this.expired = data.exp;
    }

    if (data.firstName) {
      this.firstName = data.firstName;
    }

    if (data.lastName) {
      this.lastName = data.lastName;
    }
  }

  public reset() { // TODO refactor this
    for (let field in this) {
      this[field] = null;
    }
  }
}
