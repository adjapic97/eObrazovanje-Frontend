import { ExamPeriod } from "./../../classes/ExamPeriod";
import { Observable } from "rxjs";
import { ExamService } from "./../../services/exam-service/exam.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exam-managment",
  templateUrl: "./exam-managment.component.html",
  styleUrls: ["./exam-managment.component.css"],
})
export class ExamManagmentComponent implements OnInit {
  examPeriods$: Observable<ExamPeriod[]>;

  constructor(private examPeriodService: ExamService) {}

  ngOnInit(): void {
    this.examPeriods$ = this.examPeriodService.getActivePeriod();
  }

  deactivateExamPeriod(id) {
    this.examPeriodService
      .deactivate(id)
      .subscribe((response) => {
        console.log(response);
        window.location.reload();
      });
  }


}
