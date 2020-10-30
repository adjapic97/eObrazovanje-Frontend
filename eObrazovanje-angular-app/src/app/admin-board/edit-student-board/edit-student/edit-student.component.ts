import { StudentService } from './../../../services/student-service/student.service';
import { Student } from './../../../classes/Student';
import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  isSuccessful = false;
  isDisabled = true;
  constructor(private service: StudentService) { }


  @Input() student: Student;
  ngOnInit(): void {
  }

  enableEdit(){
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled)
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  onSubmit(){
    this.service.update(this.student).subscribe(
      data => {

        (async () => {
          // Do something before delay
          this.isSuccessful = true;
          this.isDisabled = true;

          await delay(2000);

          // Do something after
         // this.isSuccessful = false;
      })();
      },
      err => {

      }

    )
  }

}
