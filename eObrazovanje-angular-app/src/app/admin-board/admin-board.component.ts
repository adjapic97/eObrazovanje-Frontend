import { FinancialCard } from './../classes/FinancialCard';
import { Student } from './../classes/Student';
import { Subject } from './../classes/Subject';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  active = 1;
  subject: Subject;
  student: Student;
  financialCard: FinancialCard;
  isEditSubject: boolean;
  isEditStudent: boolean;
  closeResult = '';
  constructor() { }

  ngOnInit(): void {
    this.isEditSubject = false;
  }

  editSubject(fromSubjectAdminEmitter){
    this.isEditSubject = fromSubjectAdminEmitter.showw;
    console.log(fromSubjectAdminEmitter.subject.subjectName)
    this.subject = fromSubjectAdminEmitter.subject;
    console.log(fromSubjectAdminEmitter.showw);
  }

  editStudents(fromStudentAdminEmitter){
    this.isEditStudent = fromStudentAdminEmitter.show;
    this.student = fromStudentAdminEmitter.student;
    this.financialCard = fromStudentAdminEmitter.finacialCard;

  }


}
