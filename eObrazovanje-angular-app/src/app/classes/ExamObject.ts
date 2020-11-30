import { Student } from "./Student";
export class ExamObject {
  studentId: number;
  pointNumber: number;
  grade: number;
  passed: boolean;

  constructor(
    studentId: number,
    pointNumber: number,
    grade: number,
    passed: boolean
  ) {
    this.studentId = studentId;
    this.pointNumber = pointNumber;
    this.grade = grade;
    this.passed = passed;
  }
}
