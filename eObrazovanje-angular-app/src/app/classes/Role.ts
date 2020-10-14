import { Privilege } from './Privilege';
export class Role{
  id: number;
  name: string;
  privileges: Privilege[];
}
