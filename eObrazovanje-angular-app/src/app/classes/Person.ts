import { Role } from './Role';

export class Person{

  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
  dateOfBirth?: Date;
  placeOfBirth: string;
  stateOfBirth: string;
  residence_address: string;
  township?: string;
  city: string;
  phoneNumber: string;
  mobilePhoneNumber: string;
  parentName: string;
  emailAddress: string;
  citzenship: string;
  ethnicity: string;
  roles?: Role[];
}
