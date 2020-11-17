import { LecturerService } from "./../../services/lecturer-service/lecturer.service";
import { Lecturer } from "./../../classes/Lecturer";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-edit-lecturer-board",
  templateUrl: "./edit-lecturer-board.component.html",
  styleUrls: ["./edit-lecturer-board.component.css"],
})
export class EditLecturerBoardComponent implements OnInit {
  lecturers: Lecturer[] = [];
  @Output() fromLecturerAdminEmitter = new EventEmitter<{
    lecturer: Lecturer;
    show: boolean;
  }>();

  constructor(private service: LecturerService) {}

  ngOnInit(): void {
    this.service.getAllLecturers().subscribe((response) => { this.lecturers = response});
  }



  editLecturer(lecturer: Lecturer, show: boolean){
    console.log("aa")
    this.fromLecturerAdminEmitter.emit({
      lecturer : lecturer,
      show: show,
    });
  }


  deleteLecturer(lecturer : Lecturer){
    console.log("delete")
  }
}
