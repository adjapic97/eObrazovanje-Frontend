import { Component, OnInit } from '@angular/core';
import { Lecturer } from '../classes/Lecturer';
import { StudentHasSubject } from '../classes/StudentHasSubject';
import { StudentDetailsComponent } from '../edit-student-board/student-details/student-details.component';
import { Subject } from './../classes/Subject';
import { ExamService } from './../services/exam-service/exam.service';
import { StudentService } from './../services/student-service/student.service';


@Component({
  selector: 'app-passed-subjects',
  templateUrl: './passed-subjects.component.html',
  styleUrls: ['./passed-subjects.component.css']
})
export class PassedSubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  lecturer: Lecturer[] = [];
  studentHasSubjects: StudentHasSubject[] = [];



  constructor(private examService: ExamService, private studentService: StudentService ) { }

  ngOnInit(): void {

    this.examService.getPassedSubjects().subscribe(
      response => this.handlePassedSubjects(response)
    )
  }

  handlePassedSubjects(response) {
    this.subjects = response;
    this.lecturer = response.lecturerDTO;
    this.studentHasSubjects = response.studentHasSubDTO;
    console.log(this.subjects);
    console.log(this.lecturer);
    console.log(this.studentHasSubjects);
  }
}
