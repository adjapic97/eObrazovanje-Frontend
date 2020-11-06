import { Student } from './../classes/Student';
import { StudentService } from './../services/student-service/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student;
  errorMessage = '';

  constructor(private studentService : StudentService) {studentService.getLoggedStudent().subscribe(response => this.student =response)}

  ngOnInit(): void {

    this.studentService.getLoggedStudent().subscribe(
      (response) => {
        this.student = response;

      },
      (error) => {
        console.error('Could not retrieve logged student')
        this.errorMessage = error;
      }
    )
    console.log(this.student)



  }

}
