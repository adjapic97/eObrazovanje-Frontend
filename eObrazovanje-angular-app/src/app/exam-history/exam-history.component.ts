import { Component, OnInit } from '@angular/core';
import { ExamRecord } from '../classes/ExamRecord';
import { StudentHasSubject } from '../classes/StudentHasSubject';
import { ExamService } from '../services/exam-service/exam.service';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.css']
})
export class ExamHistoryComponent implements OnInit {

  examRecords: ExamRecord[] = [];
  studentHasSubject: StudentHasSubject[] = [];


  constructor(private examService: ExamService) { }

  ngOnInit(): void {

    this.examService.getPassedSubjectsHistory().subscribe(
      response => this.handlePassedSubjectsHistory(response)
    )
  }

  handlePassedSubjectsHistory(response) {
    this.examRecords = response;

    console.log(this.examRecords)
    //console.log(this.studentHasSubject)
  }

}
