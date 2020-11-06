import { Subject } from './../classes/Subject';
import { SubjectService } from './../services/subject-service/subject.service';
import { SortableDirective, SortEvent } from './../directives/sortable.directive';
import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


export var SUBJECTS: Subject[] = [];

@Component({
  selector: 'app-subjects-admin-board',
  templateUrl: './subjects-admin-board.component.html',
  styleUrls: ['./subjects-admin-board.component.css']
})
export class SubjectsAdminBoardComponent implements OnInit {

  subjects$: Observable<Subject[]>;
  total$: Observable<number>;
  subjects: Subject[] = [];
  @Output() fromSubjectAdminEmitter = new EventEmitter<{subject: Subject, showw: boolean}>();



  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;


  constructor(public service: SubjectService) {

  }




  ngOnInit(): void {
     this.service.getSubjects().subscribe(response => {
       this.subjects = response;
     })
  }

  editSubject(subj : Subject, show: boolean){
    this.fromSubjectAdminEmitter.emit({ subject: subj, showw: show});
}

}
