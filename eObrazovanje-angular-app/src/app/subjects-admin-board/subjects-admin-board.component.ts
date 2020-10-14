import { SubjectService } from './../services/subject-service/subject.service';
import { SortableDirective, SortEvent } from './../directives/sortable.directive';
import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../classes/Subject';

export var SUBJECTS: Subject[] = [];

@Component({
  selector: 'app-subjects-admin-board',
  templateUrl: './subjects-admin-board.component.html',
  styleUrls: ['./subjects-admin-board.component.css']
})
export class SubjectsAdminBoardComponent implements OnInit {

  subjects$: Observable<Subject[]>;
  total$: Observable<number>;
  @Output() fromSubjectAdminEmitter = new EventEmitter<{subject: Subject, showw: boolean}>();



  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;


  constructor(public service: SubjectService) {
    this.subjects$ = service.subjects$;
    this.total$ = service.total$;
  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
      SUBJECTS = this.service.getSubjectList();
  }

  editSubject(subj : Subject, show: boolean){
    this.fromSubjectAdminEmitter.emit({ subject: subj, showw: show});
}

}
