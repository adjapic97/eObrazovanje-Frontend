import { StudentHasSubject } from "src/app/classes/StudentHasSubject";
import {
  Component,
  OnInit,
} from "@angular/core";
import { Lecturer } from "../classes/Lecturer";
import { Subject } from "./../classes/Subject";
import { ExamService } from "./../services/exam-service/exam.service";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-passed-subjects",
  templateUrl: "./passed-subjects.component.html",
  styleUrls: ["./passed-subjects.component.css"],
  providers: [DecimalPipe],
})
export class PassedSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  lecturer: Lecturer[] = [];
  studentHasSubjects: StudentHasSubject[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService
      .getPassedSubjects()
      .subscribe((response) => this.handlePassedSubjects(response));
  }

  handlePassedSubjects(response) {
    this.subjects = response;
    this.lecturer = response.lecturerDTO;
    this.studentHasSubjects = response;
  }
}
