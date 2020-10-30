import { StudentHasSubject } from './../../classes/StudentHasSubject';
import { Lecturer } from './../../classes/Lecturer';
import { Colloqium } from './../../classes/Colloqium';
import { Courses } from './../../classes/Courses';
import { SortColumn, SortDirection } from './../../directives/sortable.directive';
import { Subject } from './../../classes/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform, OnInit } from '@angular/core';
import { BehaviorSubject, Subject as _Subject, Observable, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';





interface SearchResult {
  subjects: Subject[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string |  number | Lecturer[] | Courses[] | Colloqium[] | StudentHasSubject[], v2: string | number  | Lecturer[] | Courses[] | Colloqium[] | StudentHasSubject[]) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(subjects: Subject[], column: SortColumn, direction: string): Subject[] {
  if (direction === '' || column === '') {
    return subjects;
  } else {
    return [...subjects].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(subject: Subject, term: string, pipe: PipeTransform) {
  return subject.subjectName.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(subject.ectsPoints).includes(term)
    || subject.shortName.toLowerCase().includes(term.toLowerCase());

}







@Injectable({
  providedIn: 'root'
})
export class SubjectService implements OnInit {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new _Subject<void>();
  private _subjects$ = new BehaviorSubject<Subject[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private subjectsList: Subject[];
  private _state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  ngOnInit(){
    this.getSubjectList();
  }

  constructor(private http : HttpClient, private pipe: DecimalPipe) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._subjects$.next(result.subjects);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get subjects$() { return this._subjects$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let subjects = sort(this.subjectsList, sortColumn, sortDirection);

    // 2. filter
    subjects = subjects.filter(subject => matches(subject, searchTerm, this.pipe));
    const total = subjects.length;
    console.log(subjects.length)
    // 3. paginate
    subjects = subjects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({subjects, total});
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



}
