import { Observable } from "rxjs";
import { FinancialCard } from "./../../classes/FinancialCard";
import { TokenStorageService } from "./../../services/token-storage.service";
import { StudentService } from "./../../services/student-service/student.service";
import { Subject } from "./../../classes/Subject";
import { AfterViewInit, Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "app-financial-status",
  templateUrl: "./financial-status.component.html",
  styleUrls: ["./financial-status.component.css"],
})
export class FinancialStatusComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() totalPrice: number;
  @Input() ispitiZaPrijavu: Subject[];
  @Input() exPerName: string;
  ispitiZaP: Subject[] = []
  financialCard: FinancialCard;
  afterCheckValue: number = 0;
  subs: any;
  isSuccessful = false;

  constructor(
    private studentService: StudentService,
    private tokenService: TokenStorageService
  ) {


  }
  ngOnChanges(){
    this.ispitiZaP = this.ispitiZaPrijavu;
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
      .prijaviIspite(this.ispitiZaPrijavu, this.totalPrice, this.exPerName)
      .subscribe(
        response => {
          this.resolveAfter2Seconds();
          this.isSuccessful = true;
          window.location.reload();

        },
        err => {
          this.isSuccessful = true;
          this.resolveAfter2Seconds();
         //window.location.reload();

        }
      );
    this.ngOnInit();
  }

  change(event: any) {
    console.log(event.target.value);
    this.afterCheckValue = this.financialCard.balance - this.totalPrice;
  }


  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.isSuccessful = false;
        window.location.reload();
        console.log("aa");
      }, 2000);
    });
  }
}
