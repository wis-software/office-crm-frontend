import { Model, Alias } from 'tsmodels';


export class EmployeeModel extends Model {

  @Alias() public id: number;
  @Alias() public username: string;

  @Alias() public firstName: string;
  @Alias() public lastName: string;

  constructor(data: any = {}) {
    super();

    this._fromJSON(data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

}
