import { Subject } from './../classes/Subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  active = 1;
  subject: Subject;
  isEditSubject: boolean;
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

}
