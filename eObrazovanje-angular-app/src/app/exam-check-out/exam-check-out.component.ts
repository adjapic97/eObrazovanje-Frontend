import { StudentService } from './../services/student-service/student.service';
import { Subject } from './../classes/Subject';
import { ExamService } from './../services/exam-service/exam.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../classes/Student';

@Component({
  selector: 'app-exam-check-out',
  templateUrl: './exam-check-out.component.html',
  styleUrls: ['./exam-check-out.component.css']
})
export class ExamCheckOutComponent implements OnInit {

  subjects: Subject[] = [];
  student: Student;
  examPrice: number;
  totalPrice: number = 0;
  ispitiZaOdjavu: Subject[] = [];
  active = 1;

  constructor(private examService : ExamService, private studentService : StudentService) { }

  ngOnInit(): void {

    this.examService.getPrijavioSubjects().subscribe(
      response => this.handlePrijavioSubs(response)
    )

    this.studentService.getStudentStatus().subscribe(
      response => this.handleStatus(response)
    )

  }


  handlePrijavioSubs(response){
    this.subjects = response;
  }


  handleStatus(response){
    this.student = response;
    this.checkPrice();

  }

  checkPrice(){
    if(this.student.studentStatus == 'ADVANCED_UNIVERSITY_STUDENT'){
      this.examPrice = 1500;
    } else{
      this.examPrice = 300;
    }
  }

  onChange(subject, selected : boolean){
    if(this.ispitiZaOdjavu.indexOf(subject) === -1 && selected){
      this.ispitiZaOdjavu.push(subject)
      this.totalPrice = this.totalPrice +this.examPrice;
    }
    else if(!selected){
      let index = this.ispitiZaOdjavu.indexOf(subject);
      this.ispitiZaOdjavu.splice(index,1);
      this.totalPrice = this.totalPrice  - this.examPrice;
    }
    console.log(this.totalPrice);
    console.log(this.ispitiZaOdjavu)
  }


  checkOut(){
    this.studentService.odjaviIspite(this.ispitiZaOdjavu, this.totalPrice).subscribe(
      response => {
        console.log(response)
        window.location.reload();
      },
      err => {
        console.log(err.error.message)
        window.location.reload();
      }
    )
  }
}
