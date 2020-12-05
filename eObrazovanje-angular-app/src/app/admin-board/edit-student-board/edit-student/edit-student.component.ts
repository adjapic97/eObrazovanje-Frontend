import { Transaction } from './../../../classes/Transaction';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FinancialCard } from './../../../classes/FinancialCard';
import { StudentService } from './../../../services/student-service/student.service';
import { Student } from './../../../classes/Student';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit, OnChanges {

  isSuccessful = false;
  isDisabled = true;
  finCardForm: FormGroup;
  page=1;
  pageSize=20;
  collectionSize = 0;
  transactions : Transaction[] = [];
  constructor(private service: StudentService, private fb : FormBuilder) { }

  @Input() student: Student;
  @Input() financialCard : FinancialCard;
  //@Input() financialCard : FinancialCard;
  ngOnInit(): void {
    this.finCardForm = this.createForm();

  }

  ngOnChanges(){
    this.collectionSize = this.student.financialCard.transactionDTO.length;
    this.refreshTransactions();
  }

  refreshTransactions() {
    this.transactions =this.student.financialCard.transactionDTO
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
