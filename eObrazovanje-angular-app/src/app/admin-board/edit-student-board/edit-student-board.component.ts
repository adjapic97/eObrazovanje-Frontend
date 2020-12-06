import { NbAlertModule } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialCard } from "./../../classes/FinancialCard";
import { StudentService } from "./../../services/student-service/student.service";
import {
  SortableDirective,
  SortEvent,
} from "./../../directives/sortable.directive";
import { from, Observable } from "rxjs";
import { Student } from "./../../classes/Student";
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from "@angular/core";



@Component({
  selector: 'delete-student-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Brisanje studenta</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Da li ste sigurni da zelite da izbrisete studenta: {{student.firstName + " " + student.lastName}}?</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="deleteStudent(student)">Ok</button>

  </div>
  `
})

export class deleteStudentContent{
  @Input() student: Student;
  @Input() studentsArray: Student [];
  @Output() isLoggedStudent: EventEmitter<any> = new EventEmitter<any>();
  constructor(public activeModal: NgbActiveModal, private service: StudentService, private alerModule: NbAlertModule ) {}

  deleteStudent(student: Student) {
    //this.fromStudentAdminEmitter.emit({ student: student, financialCard: this.financialCard, show: show });

    if(JSON.parse(sessionStorage.getItem('auth-user')).id !== student.id) {
      this.service.deleteStudent(student.id).subscribe(response => {
        this.removeFromArray(this.studentsArray, student);
      },
      error => {
        console.log(error.error.message);
        this.removeFromArray(this.studentsArray, student);
      });
      this.activeModal.close();
      console.log("Obrisan student");
    } else {
      //this.service.deleteStudent(student.id);

      this.activeModal.close();
      console.log("Ne mozete obrisati ulogovanog studenta!");

    }
  }

  removeFromArray(array,student){
    const index = array.indexOf(student)
      if(index > -1){
        array.splice(index,1);
      }
  }

}


export var STUDENTS: Student[] = [];

@Component({
  selector: "app-edit-student-board",
  templateUrl: "./edit-student-board.component.html",
  styleUrls: ["./edit-student-board.component.css"],
})
export class EditStudentBoardComponent implements OnInit, OnChanges {
  students: Student[] = [];
  financialCard: FinancialCard;
  total$: Observable<number>;
  idLoggedInStudent: Number;
  @Output() fromStudentAdminEmitter = new EventEmitter<{
    student: Student;
    financialCard: FinancialCard;
    show: boolean;
  }>();



  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public service: StudentService, private modalService: NgbModal) {}

  ngOnChanges() {

  }



  ngOnInit(): void {

    this.service
      .getStudents()
      .subscribe((response) => {
        this.students = response
        console.log(response)
      });

  }

  open(student: Student) {
    const modalRef = this.modalService.open(deleteStudentContent);
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.studentsArray = this.students;
  }

  editStudents(student: Student, show: boolean) {

    console.log(this.financialCard);
    this.fromStudentAdminEmitter.emit({
      student: student,
      financialCard: this.financialCard,
      show: show,
    });
  }

  deleteStudent(student: Student) {
    //this.fromStudentAdminEmitter.emit({ student: student, financialCard: this.financialCard, show: show });

    if(JSON.parse(sessionStorage.getItem('auth-user')).id !== student.id) {
      this.service.deleteStudent(student.id);
      console.log("Obrisan student");
      //.log(JSON.parse(sessionStorage.getItem('auth-user')).id);
      //console.log(student.id);
      //.log("Ne mozete obrisati ulogovanog studenta!");
    } else {
      //this.service.deleteStudent(student.id);
      console.log("Ne mozete obrisati ulogovanog studenta!");
    }
  }
}
