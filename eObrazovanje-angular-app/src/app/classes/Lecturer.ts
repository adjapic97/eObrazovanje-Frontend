import { Role } from './Role';

export class Lecturer{

  id: number;
  firstName: string;
  lastName: string;
  deleted: boolean;
  username: string;
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
  roles: Role[];


}
