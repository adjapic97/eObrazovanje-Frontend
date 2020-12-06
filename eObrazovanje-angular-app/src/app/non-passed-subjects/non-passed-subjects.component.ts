import { StudentHasSubject } from 'src/app/classes/StudentHasSubject';
import { ExamService } from './../services/exam-service/exam.service';
import { Subject } from './../classes/Subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-passed-subjects',
  templateUrl: './non-passed-subjects.component.html',
  styleUrls: ['./non-passed-subjects.component.css']
})
export class NonPassedSubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  studentHasSubjects: StudentHasSubject[] = [];

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examService
      .getNepolozeni()
      .subscribe((response) => this.handleNepolozeni(response));
  }

  handleNepolozeni(response) {
    this.studentHasSubjects = response;
    console.log(this.studentHasSubjects);
  }

}
