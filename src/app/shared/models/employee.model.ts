import { Model, Alias } from 'tsmodels';

export class EmployeeModel extends Model {

  @Alias() public email: string;
  @Alias('user_id') public userId: number;
  @Alias() public username: string;

  @Alias() public firstName: string;
  @Alias() public lastName: string;

  constructor(employeeData: any = {}) {
    super();

    this._fromJSON(employeeData);
  }
}
