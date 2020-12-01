import { StudentHasSubject } from "src/app/classes/StudentHasSubject";
import { ExamService } from "./../../services/exam-service/exam.service";
import { ExamObject } from "../../classes/ExamObject";
import { Observable } from "rxjs";
import { StudentService } from "./../../services/student-service/student.service";
import { SubjectService } from "./../../services/subject-service/subject.service";
import { Subject } from "./../../classes/Subject";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Student } from "src/app/classes/Student";
import { iExamObject } from "../../classes/ExamObject";

@Component({
  selector: "app-subject-manager",
  templateUrl: "./subject-manager.component.html",
  styleUrls: ["./subject-manager.component.css"],
})
export class SubjectManagerComponent implements OnInit {
  @Input() subject: Subject;
  @Input() students$: Observable<Student[]>;
  @Input() allStudents$: Observable<StudentHasSubject[]>;
  passedStudents: iExamObject[] = [];
  polozio: boolean = false;
  pointNumber: number;
  grade: number;
  selectedOcena: number = 5;
  //isDisabled: boolean = false;

  click: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.grade = this.checkGrade(this.pointNumber);
  }

  pushStudent(student, pointNumber, grade) {
    console.log(student.id);
    // var studentExam = new ExamObject();
    // studentExam.studentId = student.id;
    // //grade = this.checkGrade(this.pointNumber);
    // studentExam.grade = Number(this.selectedOcena);
    // studentExam.pointNumber = 0;
    // // studentExam.pointNumber = pointNumber;
    // studentExam.passed = true;

    //this.passedStudents.push(...new ExamObject(student.id,0, Number(this.selectedOcena), true));
   /*  this.passedStudents = [
      ...this.passedStudents,
      new ExamObject(
        student.id,
        0,
        Number(this.selectedOcena),
        true,
        "Note + add dynamic"
      ),
    ]; */
    
    const studentExists = this.passedStudents.find(s=> s.studentId === student.id)
    if(!studentExists) {
      this.passedStudents.push({ "studentId": student.id, 
                                  "pointNumber": 0, 
                                  "grade": this.selectedOcena, 
                                  "passed": true });
      console.log(this.subject.id);
    }
    
    console.log(studentExists);
    
    console.log(this.passedStudents);
    //this.isDisabled = true;
    this.click = true;
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedOcena = event.target.value;
    console.log(this.selectedOcena);
  }

  sendStudents() {
    this.examService
      .sendExamObjectList(this.passedStudents, this.subject.id)
      .subscribe((response) => {
        console.log(response);        
      });
  }

  removeStudent(student: Student) {
    //this.passedStudents.push(student)
    var found = false;
    if (this.passedStudents.length != 0) {
      for (var i = 0; i <= this.passedStudents.length; i++) {
        if (this.passedStudents[i].studentId == student.id) {
          var removeIndex = this.passedStudents
            .map(function (student) {
              return student.studentId;
            })
            .indexOf(student.id);
          this.passedStudents.splice(removeIndex, 1);
          console.log(this.passedStudents);
        } else {
          console.log("student is not in this array");
        }
      }
    } else {
      console.log("array is empty");
    }
  }

  checkGrade(pointNumber): number {
    var grade = 0;
    if (pointNumber == 0 && pointNumber <= 50) {
      grade = 5;
    } else if (pointNumber >= 51 && pointNumber <= 60) {
      grade = 6;
    } else if (pointNumber >= 61 && pointNumber <= 70) {
      grade = 7;
    } else if (pointNumber >= 71 && pointNumber <= 80) {
      grade = 8;
    } else if (pointNumber >= 81 && pointNumber <= 90) {
      grade = 9;
    } else if (pointNumber >= 91 && pointNumber <= 100) {
      grade = 10;
    }
    return grade;
  }
}