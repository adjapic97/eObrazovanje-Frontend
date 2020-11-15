import { SubjectService } from "./../../services/subject-service/subject.service";
import { Subject } from "./../../classes/Subject";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Student } from "src/app/classes/Student";

@Component({
  selector: "app-subject-manager",
  templateUrl: "./subject-manager.component.html",
  styleUrls: ["./subject-manager.component.css"],
})
export class SubjectManagerComponent implements OnInit {
  @Input() subject: Subject;
  students: Student[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {


    }



}
