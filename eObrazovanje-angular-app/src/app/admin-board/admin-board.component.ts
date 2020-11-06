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
  isEditSubject: boolean;
  isEditStudent: boolean;
  closeResult = '';
  constructor(private modalService: NgbModal) { }

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

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
