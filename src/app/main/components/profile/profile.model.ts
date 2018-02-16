export class ProfileModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  workStarted: Date;
  position: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  email: string;

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.firstName = data.firstName || '';
    this.middleName = data.middleName || '';
    this.lastName = data.lastName || '';
    this.birthday = new Date(data.birthday) || new Date();
    this.workStarted = new Date(data.workStarted) || new Date();
    this.position = data.position.name || '';
    this.phoneNumber = data.phoneNumber || '';
    this.additionalPhoneNumber = this.phoneNumber;
    this.email = data.email || '';
  }
}
