import { ExamService } from './../services/exam-service/exam.service';
import { StudentHasSubject } from './../classes/StudentHasSubject';
import { Lecturer } from './../classes/Lecturer';
import { Subject } from './../classes/Subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-passed-subjects',
  templateUrl: './non-passed-subjects.component.html',
  styleUrls: ['./non-passed-subjects.component.css']
})
export class NonPassedSubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  lecturer: Lecturer[] = [];
  studentHasSubjects: StudentHasSubject[] = [];

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
      this.examService.getNonPassedSubjects()
        .subscribe((response) => this.handleNonPassedSubjects(response));
  }

  handleNonPassedSubjects(response) {
    this.studentHasSubjects = response;
    console.log(this.studentHasSubjects);
  }

}
