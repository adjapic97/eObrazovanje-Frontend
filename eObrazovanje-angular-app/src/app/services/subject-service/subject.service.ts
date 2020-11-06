import { StudentHasSubject } from './../../classes/StudentHasSubject';
import { Lecturer } from './../../classes/Lecturer';
import { Colloqium } from './../../classes/Colloqium';
import { Courses } from './../../classes/Courses';
import { SortColumn, SortDirection } from './../../directives/sortable.directive';
import { Subject } from './../../classes/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform, OnInit } from '@angular/core';
import { BehaviorSubject, Subject as _Subject, Observable, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const SUBJECTURL = 'http://localhost:8080/api/subject/'








@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new _Subject<void>();
  private _subjects$ = new BehaviorSubject<Subject[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private subjectsList: Subject[];




  constructor(private http : HttpClient, private pipe: DecimalPipe) {


  }





  getSubjects(){
    return this.http.get<Subject[]>('http://localhost:8080/api/subject/get-all')
  }

  getSubjectList(){

    this.getSubjects().subscribe(
        response => this.subjectsList = response,
      );

    return this.subjectsList;
  }



  update(subject): Observable<any>{
    return this.http.put(SUBJECTURL + "update/" + subject.id, {
      id: subject.id,
      subjectName: subject.subjectName,
      shortName: subject.shortName,
      ectsPoints: subject.ectsPoints,
      lecturerDTO: subject.lecturerDTO,
      StudentHasSubject: subject.studentHasSubjects,

    }, httpOptions)
  }



}
