import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FinancialCard } from './../../../classes/FinancialCard';
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
  finCardForm: FormGroup;
  constructor(private service: StudentService, private fb : FormBuilder) { }

  @Input() student: Student;
  @Input() financialCard : FinancialCard;
  //@Input() financialCard : FinancialCard;
  ngOnInit(): void {
    this.finCardForm = this.createForm();

  }


  createForm(): FormGroup {
    return this.fb.group({
      amount: [0, Validators.required]
    })
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
          this.isSuccessful = false;
          // Do something after
         // this.isSuccessful = false;
      })();
      },
      err => {

      }

    )
  }


  onFinancialCardSubmit(){
    console.log(this.student)
    console.log(this.finCardForm.value.amount)
    this.service.depositAmount(this.finCardForm.value.amount, this.student)
  }

}
