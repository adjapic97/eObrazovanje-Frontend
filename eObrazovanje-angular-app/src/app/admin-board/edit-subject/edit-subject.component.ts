import { Student } from 'src/app/classes/Student';
import { StudentHasSubject } from './../../classes/StudentHasSubject';
import { StudentService } from "./../../services/student-service/student.service";
import { Observable } from "rxjs";
import { LecturerService } from "./../../services/lecturer-service/lecturer.service";
import { Lecturer } from "./../../classes/Lecturer";
import { SubjectService } from "./../../services/subject-service/subject.service";
import { Subject } from "./../../classes/Subject";
import { Component, OnInit, Input, Type, OnChanges } from "@angular/core";
import { delay } from "rxjs/operators";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Da li ste sigurni?</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        Da li ste sigurni da zelite da uklonite
        {{ lecturer.firstName + " " + lecturer.lastName }}?
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="activeModal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="deleteFromSubject(lecturer)"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() lecturer: Lecturer;
  @Input() subjectId: number;
  @Input() lecturerArray: Lecturer[];

  constructor(
    public activeModal: NgbActiveModal,
    private lecturerService: LecturerService
  ) {}

  deleteFromSubject(lecturer) {
    this.lecturerService
      .deleteFromSubject(lecturer, this.subjectId)
      .subscribe((response) => {
        this.removeFromArray(this.lecturerArray, lecturer);
      });
    this.activeModal.close();
  }

  removeFromArray(array, lecturer) {
    const index = array.indexOf(lecturer);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Da li ste sigurni?</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        Da li ste sigurni da zelite da uklonite
        {{ studentName}}?
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="activeModal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="deleteFromSubject(studentId)"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbStudentModal {
  @Input() subjectId: number;

  @Input() studentId: number;
  @Input() studentName: string;
  @Input() sthsArray: StudentHasSubject[];


  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentService
  ) {}

  deleteFromSubject(studentId) {
    this.studentService
      .deleteStudentFromSubject(studentId, this.subjectId)
      .subscribe((response) => {
        this.removeFromArray(this.sthsArray, studentId)
      });
    this.activeModal.close();
  }

  removeFromArray(array, studentId) {
    const index = array.map(x => {
      return x.studentId;
    }).indexOf(studentId);
    array.splice(index,1);

  }
}

@Component({
  selector: "app-edit-subject",
  templateUrl: "./edit-subject.component.html",
  styleUrls: ["./edit-subject.component.css"],
})
export class EditSubjectComponent implements OnInit, OnChanges {
  isSuccessful = false;
  isDisabled = true;
  isArrayEmtpy: boolean = false;
  isStudentArrayEmpty : boolean = false;
  lecturers$: Observable<Lecturer[]>;
  students$: Observable<Student[]>;
  @Input() subject: Subject;
  lecturer: Lecturer;
  student: Student;
  lecturersToAdd: Lecturer[] = [];
  studentsToAdd: Student[] = [];


  constructor(
    private service: SubjectService,
    private modalService: NgbModal,
    private lecturerService: LecturerService,
    private studentService: StudentService
  ) {}



  ngOnChanges() {
    this.lecturers$ = this.lecturerService.getAllNotInSubject(this.subject.id);
    this.students$ = this.studentService.getNotInSubject(this.subject.id);
    this.lecturersToAdd = [];
    this.studentsToAdd = [];
    console.log(this.subject.studentHasSubDTO);
  }

  ngOnInit(): void {}

  open(lecturer, subject) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.lecturer = lecturer;
    modalRef.componentInstance.subjectId = subject.id;
    modalRef.componentInstance.lecturerArray = subject.lecturerDTO;
  }

  openStudentDialog(studentId, subject, studentName) {
    const modalRef = this.modalService.open(NgbStudentModal);
    modalRef.componentInstance.studentId = studentId;
    modalRef.componentInstance.subjectId = subject.id;
    modalRef.componentInstance.studentName = studentName;
    modalRef.componentInstance.sthsArray = subject.studentHasSubDTO;
  }

  addLecturers() {
    console.log(this.lecturersToAdd);
    if (this.lecturersToAdd == undefined || this.lecturersToAdd.length == 0) {
      this.isArrayEmtpy = true;
    } else {
      this.lecturerService
        .addToSubject(this.lecturersToAdd, this.subject.id)
        .subscribe((response) => {
          this.isArrayEmtpy = false;
        });
    }
  }

  addStudents() {
    console.log(this.studentsToAdd);
    if (this.studentsToAdd == undefined || this.studentsToAdd.length == 0) {
      this.isStudentArrayEmpty = true;
    } else {
      this.studentService
        .addToSubject(this.studentsToAdd, this.subject.id)
        .subscribe((response) => {
          this.isArrayEmtpy = false;
        });
    }
  }


  enableEdit() {
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onSubmit() {
    this.service.update(this.subject).subscribe(
      (data) => {
        (async () => {
          // Do something before delay
          this.isSuccessful = true;
          this.isDisabled = true;

          await delay(2000);

          // Do something after
          // this.isSuccessful = false;
        })();
      },
      (err) => {}
    );
  }
}
