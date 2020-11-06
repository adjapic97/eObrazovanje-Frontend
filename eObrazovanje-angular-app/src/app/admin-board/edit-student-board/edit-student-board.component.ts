import { StudentService } from './../../services/student-service/student.service';
import { SortableDirective, SortEvent } from './../../directives/sortable.directive';
import { Observable } from 'rxjs';
import { Student } from './../../classes/Student';
import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';



export var STUDENTS: Student[] = [];

@Component({
  selector: 'app-edit-student-board',
  templateUrl: './edit-student-board.component.html',
  styleUrls: ['./edit-student-board.component.css']
})
export class EditStudentBoardComponent implements OnInit {

  students: Student[] =[];
  total$: Observable<number>;
  @Output() fromStudentAdminEmitter = new EventEmitter<{student: Student, show: boolean}>();



  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public service: StudentService) {

  }

  ngOnInit(): void {

    this.service.getStudents().subscribe(response => this.students = response)
    console.log(STUDENTS)
  }

  editStudents(student : Student, show: boolean){
    this.fromStudentAdminEmitter.emit({student: student, show: show});
  }

}
