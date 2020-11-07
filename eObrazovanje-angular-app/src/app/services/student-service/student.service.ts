import { Lecturer } from './../../classes/Lecturer';
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




@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {


  constructor(private http : HttpClient, private pipe: DecimalPipe) {


  }


  ngOnInit(){



  }



  getStudents() {
    return this.http.get<Student[]>('http://localhost:8080/api/student/get-all')

  }

  getStudentStatus(): Observable<any>{
   return  this.http.get<Student>(STUDENTURL + 'get-student-status')
  }






  update(student): Observable<any> {
    console.log(student.currentYear)
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



getLoggedStudent(): Observable<any>{
  return this.http.get(STUDENTURL+ "get-logged-student");
}


getStudentFinancialCard(id): Observable<any>{
  return this.http.get(STUDENTURL + "get-financial-card?studentId=" + id);
}


depositAmount(amount, student){

  return this.http.post<Student>('http://localhost:8080/api/manager/deposit-amount?amount=' + amount, student, httpOptions).subscribe(
    (response) => {console.log(response)},

  )

  //this.http.post(STUDENTURL + "deposit-amount")

}


//SEARCH


}
