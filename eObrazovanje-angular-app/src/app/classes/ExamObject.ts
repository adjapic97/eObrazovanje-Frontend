import { Student } from "./Student";
export class ExamObject implements iExamObject {
  studentId: number;
  pointNumber: number;
  grade: number;
  passed: boolean;
  note: string;

  constructor(
    studentId: number,
    pointNumber: number,
    grade: number,
    passed: boolean,
    note: string
  ) {
    this.studentId = studentId;
    this.pointNumber = pointNumber;
    this.grade = grade;
    this.passed = passed;
    this.note = note;
  }
}


export interface iExamObject {
  studentId: number;
  pointNumber: number;
  grade: number;
  passed: boolean;
  note: string;
}
