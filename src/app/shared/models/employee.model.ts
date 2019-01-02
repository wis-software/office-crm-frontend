import { Expose, plainToClassFromExist } from 'class-transformer';


export class EmployeeModel {

  @Expose()
  public id: number;

  @Expose()
  public username: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  constructor(data: any = {}) {
    plainToClassFromExist(this, data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

}
