import { iExamObject } from './../../classes/ExamObject';
import { ExamObject } from '../../classes/ExamObject';
import { Observable } from 'rxjs';
import { Subject } from './../../classes/Subject';
import { ExamPeriod } from './../../classes/ExamPeriod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentHasSubject } from 'src/app/classes/StudentHasSubject';
import { ExamRecord } from 'src/app/classes/ExamRecord';
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
  getPrijavioSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:8080/api/exam-period/get-subjects-prijavio?id=' + JSON.parse(sessionStorage.getItem('auth-user')).id)
  }
  getPassedSubjects(): Observable<StudentHasSubject[]> {
    return this.http.get<StudentHasSubject[]>('http://localhost:8080/api/exam-record/get-passed-subjects?id=' + JSON.parse(sessionStorage.getItem('auth-user')).id)
  }
  getPassedSubjectsHistory(): Observable<ExamRecord[]> {
    return this.http.get<ExamRecord[]>('http://localhost:8080/api/exam-record/get-passed-subjects-history?id=' + JSON.parse(sessionStorage.getItem('auth-user')).id)
  }
  sendExamObjectList(examObject : ExamObject[], subjectId){
    return this.http.post('http://localhost:8080/api/exam-record/send-students?subjectId=' + subjectId, examObject, httpOptions)
  }
  deactivate(id){
    return this.http.post('http://localhost:8080/api/exam-period/deactivate?examPeriodId=' + id,{
      headers: new HttpHeaders({ 'Content-Type': 'text' })
    } );
  }
}
