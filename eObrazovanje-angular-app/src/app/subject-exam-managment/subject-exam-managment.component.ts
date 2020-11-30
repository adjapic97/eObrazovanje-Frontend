import { SubjectService } from './../services/subject-service/subject.service';
import { Subject } from './../classes/Subject';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject-exam-managment',
  templateUrl: './subject-exam-managment.component.html',
  styleUrls: ['./subject-exam-managment.component.css']
})
export class SubjectExamManagmentComponent implements OnInit {

  lecturerSubjects: Subject[] = [];
  subject: Subject;




  constructor(private subjectService : SubjectService) { }

  ngOnInit(): void {

    this.subjectService.getSubjectsForLecturer(JSON.parse(sessionStorage.getItem("auth-user")).id)
    .subscribe(
      response => this.lecturerSubjects = response
            
    );
    console.log(this.lecturerSubjects);
    

  }

  manage(subject){
    this.subject = subject;
  }
}
