import { StudentService } from './../../services/student-service/student.service';
import { Subject } from './../../classes/Subject';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css']
})
export class FinancialStatusComponent implements OnInit {


  @Input() totalPrice: number;
  @Input() ispitiZaPrijavu: Subject[];


  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
  }




  submit(){
    this.studentService.prijaviIspite(this.ispitiZaPrijavu)
  }

}
