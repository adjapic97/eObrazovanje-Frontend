import { StudentHasSubject } from 'src/app/classes/StudentHasSubject';
import { Student } from './../classes/Student';
import { Observable } from 'rxjs';
import { StudentService } from './../services/student-service/student.service';
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
  students$ : Observable<Student[]>;
  allStudents$ : Observable<StudentHasSubject[]>;




  constructor(private subjectService : SubjectService, private studentService : StudentService) { }

  ngOnInit(): void {



    this.subjectService.getSubjectsForLecturer(JSON.parse(sessionStorage.getItem("auth-user")).id)
    .subscribe(
      response => this.lecturerSubjects = response
    );


  }

  manage(subject){
    this.subject = subject;
    this.students$ = this.studentService.getStudentsForSubjectActivePeriod(this.subject.id);
    this.allStudents$ = this.studentService.getAllForSubject(this.subject.id);
  }
}