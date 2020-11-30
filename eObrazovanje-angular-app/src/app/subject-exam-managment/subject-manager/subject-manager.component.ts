import { StudentExamObject } from "./../../classes/StudentExamObject";
import { Observable } from "rxjs";
import { StudentService } from "./../../services/student-service/student.service";
import { SubjectService } from "./../../services/subject-service/subject.service";
import { Subject } from "./../../classes/Subject";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Student } from "src/app/classes/Student";

@Component({
  selector: "app-subject-manager",
  templateUrl: "./subject-manager.component.html",
  styleUrls: ["./subject-manager.component.css"],
})
export class SubjectManagerComponent implements OnInit {
  @Input() subject: Subject;
  students$: Observable<Student[]>;
  passedStudents: StudentExamObject[] = [];
  polozio: boolean = false;
  pointNumber: number;
  grade: number;
  selectedOcena: number = 5;
  isDisabled: boolean = false;

  click : boolean = false;

  ocene = [
    {
      number: 5,
      name: "pet",
    },
    {
      number: 6,
      name: "sest",
    },
    {
      number: 7,
      name: "sedam",
    },
    {
      number: 8,
      name: "osam",
    },
    {
      number: 9,
      name: "devet",
    },
    {
      number: 10,
      name: "deset",
    },
  ];

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentService.getStudentsForSubjectActivePeriod(2);
    //this.grade = this.checkGrade(this.pointNumber);
  }
/* 
  function onEdit(index){
  students$[index].isEditing = true;
}

function onUpdate(index){
  // You may want to do something with the new data, maybe some validation or so
  MyTblDataList[index].isEditing = false;
}
 */

  pushStudent(student) {
    console.log(student.id);
    var studentExam = new StudentExamObject();
    studentExam.student = student;
    studentExam.grade = this.selectedOcena;
    studentExam.passed = true;

    this.passedStudents.push(studentExam);
    console.log(this.passedStudents);
    
    this.click = true;


  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedOcena = event.target.value;
    console.log(this.selectedOcena);
  }

  removeStudent(student: Student) {
    //this.passedStudents.push(student)
    var found = false;
    if (this.passedStudents.length != 0) {
      for (var i = 0; i <= this.passedStudents.length; i++) {
        if (this.passedStudents[i].student.id == student.id) {
          var removeIndex = this.passedStudents
            .map(function (student) {
              return student.student.id;
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
/* 
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

 */

}
