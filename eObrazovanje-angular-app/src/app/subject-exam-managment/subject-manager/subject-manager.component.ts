import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  setterForm: FormGroup;
  time = { hour: 13, minute: 30 };
  //isDisabled: boolean = false;

  click: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService,
    private examService: ExamService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.grade = this.checkGrade(this.pointNumber);
    this.setterForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      examPlace: ["", Validators.required],
      examDate: ["", Validators.required],
      time: ["", Validators.required],
    });
  }

  pushStudent(student, pointNumber, grade) {
    console.log(student.id);

    const studentExists = this.passedStudents.find(
      (s) => s.studentId === student.id
    );
    if (!studentExists) {
      this.passedStudents.push({
        studentId: student.id,
        pointNumber: 0,
        grade: Number(this.selectedOcena),
        passed: true,
        note: "aaa",
      });
    } else {
      this.updateGrade(
        Number(this.selectedOcena),
        this.passedStudents,
        student
      );
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
        window.location.reload();
      });
  }

  resetTimeDate() {
    this.time.hour = 0;
    this.time.minute = 0;
    this.setterForm.value.examDate = " ";
    this.setterForm.value.examPlace = " ";
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

  updateSubject(subject, time) {
    this.subjectService
      .updatePlaceAndDate(this.setterForm.value, subject, time)
      .subscribe(
        (data) => {
          console.log(this.setterForm);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
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

  updateGrade(grade, passedStudents, student) {
    const stud = this.passedStudents.find((s) => s.studentId === student.id);
    stud.grade = grade;
    console.log(this.passedStudents);
  }
}
