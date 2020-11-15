import { Observable } from "rxjs";
import { FinancialCard } from "./../../classes/FinancialCard";
import { TokenStorageService } from "./../../services/token-storage.service";
import { StudentService } from "./../../services/student-service/student.service";
import { Subject } from "./../../classes/Subject";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-financial-status",
  templateUrl: "./financial-status.component.html",
  styleUrls: ["./financial-status.component.css"],
})
export class FinancialStatusComponent implements OnInit, AfterViewInit {
  @Input() totalPrice: number;
  @Input() ispitiZaPrijavu: Subject[];

  financialCard: FinancialCard;
  afterCheckValue: number = 0;
  subs: any;

  constructor(
    private studentService: StudentService,
    private tokenService: TokenStorageService
  ) {


  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.studentService
      .getStudentFinancialCard(this.tokenService.getUser().id)
      .subscribe((response) => (this.financialCard = response));
  }

  submit() {
    console.log(this.afterCheckValue);
    this.studentService
      .prijaviIspite(this.ispitiZaPrijavu, this.totalPrice)
      .subscribe(
        (response) => {
         window.location.reload();
        },
        (err) => {
         window.location.reload();
        }
      );
    this.ngOnInit();
  }

  change(event: any) {
    console.log(event.target.value);
    this.afterCheckValue = this.financialCard.balance - this.totalPrice;
  }
}
