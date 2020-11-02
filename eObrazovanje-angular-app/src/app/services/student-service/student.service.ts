import { Subject } from './../../classes/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject as _Subject, Observable, of } from 'rxjs';
import { SortColumn, SortDirection } from './../../directives/sortable.directive';
import { Student } from './../../classes/Student';
import { Injectable, PipeTransform, OnInit } from '@angular/core';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';


const STUDENTURL = 'http://localhost:8080/api/student/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


interface SearchResult {
  students: Student[];
  total: number;
}


interface State{

  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}




const compare = (v1: string |  number , v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(students: Student[], column: SortColumn, direction: string): Student[] {
  if (direction === '' || column === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(student: Student, term: string, pipe: PipeTransform) {
  return student.firstName.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(student.avgGrade).includes(term)
    || student.lastName.toLowerCase().includes(term.toLowerCase())
    || student.parentName.toLowerCase().includes(term.toLowerCase())
    || student.gender.toLowerCase().includes(term.toLowerCase())
    || student.citizenship.toLowerCase().includes(term.toLowerCase())
    || student.city.toLowerCase().includes(term.toLowerCase())
    || student.stateOfBirth.toLowerCase().includes(term.toLowerCase())
    || student.studentStatus.toLowerCase().includes(term.toLowerCase())
    || student.highSchool.toLowerCase().includes(term.toLowerCase())
    || student.indexNumber.toLowerCase().includes(term.toLowerCase())
    || student.mobilePhoneNumber.toLowerCase().includes(term.toLowerCase())
    || student.phoneNumber.toLowerCase().includes(term.toLowerCase())
    || student.township.toLowerCase().includes(term.toLowerCase());

}

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {
  private header = new HttpHeaders({ 'content-type': 'application/json' });
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new _Subject<void>();
  private _students$ = new BehaviorSubject<Student[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private studentsList: Student[];
  private _state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http : HttpClient, private pipe: DecimalPipe) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._students$.next(result.students);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get students$() { return this._students$.asObservable(); }
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
    let students = sort(this.studentsList, sortColumn, sortDirection);

    // 2. filter
    students = students.filter(student => matches(student, searchTerm, this.pipe));
    const total = students.length;
    console.log(students.length)
    // 3. paginate
    students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({students, total});
  }

  ngOnInit(){
      this.getStudentsList();
      console.log(this.getStudents())
  }



  getStudents() {
    return this.http.get<Student[]>('http://localhost:8080/api/student/get-all')

  }

  getStudentStatus(): Observable<any>{
   return  this.http.get<Student>(STUDENTURL + 'get-student-status')
  }

  getStudentsList(){
    this.getStudents().subscribe(
      response => this.studentsList = response,
    );

    return this.studentsList;
  }





  update(student): Observable<any> {
    return this.http.put(STUDENTURL + "update/" + student.id, {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      deleted: student.deleted,
      username: student.username,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      placeOfBirth: student.placeOfBirth,
      stateOfBirth: student.stateOfBirth,
      residence_address: student.residence_address,
      township: student.township,
      city: student.city,
      phoneNumber: student.phoneNumber,
      mobilePhoneNumber: student.mobilePhoneNumber,
      citizenship: student.citizenship,
      ethnicity: student.ethnicity,
      indexNumber: student.indexNumber,
      highSchool: student.highSchool,
      hsFinishYear: student.hsFinishYear,
      parentName: student.parentName,
      currentYear: student.currentYear,
      course: student.course,
      avgGrade: student.avgGrade,
      studentStatus: student.studentStatus,
    }, httpOptions);
  }



  prijaviIspite(subjects){

    console.log(subjects)
    return this.http.post('http://localhost:8080/api/student/exam-check',subjects,httpOptions)
    .subscribe(subjects => (console.log(subjects)))

  }
}
