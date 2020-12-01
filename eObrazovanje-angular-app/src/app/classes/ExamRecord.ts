import {ExamPeriod} from './ExamPeriod';
import { StudentHasSubject } from './StudentHasSubject';

export class ExamRecord {
  examPeriod: ExamPeriod;
  studentHasSubject: StudentHasSubject[];
  subjectShortName: string;
  subjectName: string;
  lecturerName: string;
  passed: boolean;
  note: string;
  examDate: Date;
  ocena: number;

  constructor() {}

}
