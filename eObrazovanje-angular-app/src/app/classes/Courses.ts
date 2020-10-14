import { Subject } from './Subject';

export class Courses {

  id: number;
  courseName: string;
  shortName: string;
  description: string;
  subjects?: Subject[];


}
