import { Exam } from './Exam';

export class StudentHasSubject {

  studentId: number;
  subjectId: number;
  ocena: number;
  brPokusaja: number;
  passed: boolean;
  exams?: Exam[];

}