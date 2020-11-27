import { Exam } from './Exam';

export class StudentHasSubject {

  studentId: number;
  subjectId: number;
  ocena: number;
  brPokusaja: number;
  passed: boolean;
  exams?: Exam[];
  prijavio: boolean;
  lecturerName: string;
  shortName: string;
  subjectName: string;
  examDate: Date;
  ectsPoints: number;

}
