import { Subject } from './Subject';
import { Role } from './Role';

export class Lecturer{

  id: string;
  firstName: string;
  lastName: string;
  deleted: boolean;
  username: string;
  password: string;
  gender: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  stateOfBirth: string;
  township: string;
  city: string;
  phoneNumber: string;
  mobilePhoneNumber: string;
  emailAddress: string;
  citizenship: string;
  ethnicity: string;
  residence_address: string;
  roles: Role[];
  subjects?: Subject[];


}
