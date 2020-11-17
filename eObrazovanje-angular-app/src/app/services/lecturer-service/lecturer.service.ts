import { Observable, of } from "rxjs";
import { Lecturer } from "./../../classes/Lecturer";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";

const LECTURER_URL = "http://localhost:8080/api/lecturer/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class LecturerService {
  dateString: string;

  constructor(private http: HttpClient) {}

  getAllLecturers() {
    return this.http.get<Lecturer[]>(LECTURER_URL + "get-all");
  }

  createLecturer(form, roles, subjects) {
    this.dateString =
      form.dateOfBirth.year +
      "/" +
      form.dateOfBirth.month +
      "/" +
      form.dateOfBirth.day;
    var date = new Date(this.dateString);
    return this.http.post<Lecturer>(
      "http://localhost:8080/api/manager/create-lecturer",
      {
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
        username: form.username,
        gender: form.gender,
        dateOfBirth: date,
        placeOfBirth: form.placeOfBirth,
        stateOfBirth: form.stateOfBirth,
        township: form.township,
        city: form.city,
        phoneNumber: form.phoneNumber,
        mobilePhoneNumber: form.mobilePhoneNumber,
        residence_address: form.residence_address,
        emailAddress: form.emailAddress,
        citizenship: form.citizenship,
        ethnicity: form.ethnicity,
        roles: roles,
        subjects: subjects,
      },
      httpOptions
    );
  }

  update(lecturer): Observable<any> {
    return this.http.put(
      LECTURER_URL + "update/" + lecturer.id,
      {
        id: lecturer.id,
        firstName: lecturer.firstName,
        lastName: lecturer.lastName,
        deleted: lecturer.deleted,
        username: lecturer.username,
        gender: lecturer.gender,
        dateOfBirth: lecturer.dateOfBirth,
        placeOfBirth: lecturer.placeOfBirth,
        stateOfBirth: lecturer.stateOfBirth,
        residence_address: lecturer.residence_address,
        township: lecturer.township,
        city: lecturer.city,
        phoneNumber: lecturer.phoneNumber,
        mobilePhoneNumber: lecturer.mobilePhoneNumber,
        citizenship: lecturer.citizenship,
        ethnicity: lecturer.ethnicity,
        parentName: lecturer.parentName,
      },
      httpOptions
    );
  }
}
