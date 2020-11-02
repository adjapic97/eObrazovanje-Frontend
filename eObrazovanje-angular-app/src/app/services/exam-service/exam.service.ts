import { Subject } from './../../classes/Subject';
import { Observable } from 'rxjs';
import { ExamPeriod } from './../../classes/ExamPeriod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



const EXAM_API = 'http://localhost:8080/api/exam-period';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ExamService {




  constructor(private http: HttpClient) { }



  getActivePeriod(): Observable<ExamPeriod[]>{
    return this.http.get<ExamPeriod[]>(EXAM_API + "/get-active-exam-period")
  }


  getNonPassedSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>('http://localhost:8080/api/exam-period/get-subjects?id=' + JSON.parse(sessionStorage.getItem('auth-user')).id)
  }



}
