import { StudentHasSubject } from 'src/app/classes/StudentHasSubject';
import { TokenStorageService } from "./../token-storage.service";
import { Lecturer } from "./../../classes/Lecturer";
import { Subject } from "./../../classes/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Subject as _Subject, Observable, of } from "rxjs";
import {
  SortColumn,
  SortDirection,
} from "./../../directives/sortable.directive";
import { Student } from "./../../classes/Student";
import { Injectable, PipeTransform, OnInit } from "@angular/core";
import { tap, debounceTime, switchMap, delay, map } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";

const STUDENTURL = "http://localhost:8080/api/student/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class StudentService implements OnInit {
  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe,
    private tokenSS: TokenStorageService
  ) {}

  ngOnInit() {}

  getStudents() {
    return this.http.get<Student[]>(
      "http://localhost:8080/api/student/get-all"
    );
  }

  getNotInSubject(subjectId): Observable<Student[]> {
    return this.http.get<any>(STUDENTURL + "get-not-in-subject?subjectId=" + subjectId);
  }

  getStudentStatus(): Observable<any> {
    return this.http.get<Student>(STUDENTURL + "get-student-status");
  }

  getStudentsForSubjectActivePeriod(subjectId) {
    return this.http.get<Student[]>(
      STUDENTURL + "get-for-active?subjectId=" + subjectId
    );
  }

  getAllForSubject(subjectId) {
    return this.http.get<StudentHasSubject[]>(
      STUDENTURL + "get-all-for-subject?subjectId=" + subjectId
    );
  }

  addToSubject(studentsToAdd: Student[], subjectId): Observable<any> {
    return this.http.post(
      STUDENTURL + "add-to-subject?subjectId=" + subjectId,
      studentsToAdd,
      httpOptions
    )
  }

  update(student): Observable<any> {
    console.log(student.currentYear);
    return this.http.put(
      STUDENTURL + "update/" + student.id,
      {
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
      },
      httpOptions
    );
  }

  updatePartial(form): Observable<any> {
    console.log(form);
    return this.http.put(
      STUDENTURL + "update-partial/" + this.tokenSS.getUser().id,
      {
        username: form.username,
        mobilePhoneNumber: form.mobilePhoneNumber,
        phoneNumber: form.phoneNumber,
        residence_address: form.residence_address,
      },
      httpOptions
    );
  }

  prijaviIspite(subjects, totalPrice, exPerName) {
    console.log(subjects);
    return this.http.post(
      "http://localhost:8080/api/student/exam-check?totalPrice=" + totalPrice + "&examPeriodName=" + exPerName,
      subjects,
      httpOptions
    );
  }

  odjaviIspite(subjects, totalPrice) {
    console.log(subjects);
    return this.http.post(
      "http://localhost:8080/api/student/exam-check-out?returnAmount=" +
        totalPrice,
      subjects,
      httpOptions
    );
  }

  getLoggedStudent(): Observable<any> {
    return this.http.get(STUDENTURL + "get-logged-student");
  }

  getStudentFinancialCard(id): Observable<any> {
    return this.http.get(STUDENTURL + "get-financial-card?studentId=" + id);
  }

  deleteStudentFromSubject(studentId, subjectId) {
    return this.http.delete('http://localhost:8080/api/student/delete-from-subject?studentId=' + studentId + "&subjectId=" + subjectId);

  }

  depositAmount(amount, student) {
    return this.http
      .post<Student>(
        "http://localhost:8080/api/manager/deposit-amount?amount=" + amount,
        student,
        httpOptions
      )
      .subscribe((response) => {
        console.log(response);
      });

    //this.http.post(STUDENTURL + "deposit-amount")
  }

  //SEARCH
}
