import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Person } from '../classes/Person';

const MANAGERURL = 'http://localhost:8080/api/manager/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const params = new URLSearchParams();


@Injectable({
  providedIn: 'root'
})
export class UserService {
  person: Person = new Person;
  errorCreation: boolean;
  dateString: string;
  constructor(private http: HttpClient) { }


   public  createNewStudent(form){


      this.dateString = form.dateOfBirth.year + "/" + form.dateOfBirth.month + "/" + form.dateOfBirth.day;
      var date = new Date(this.dateString)
     return this.http.post<Person>(MANAGERURL + 'create-user?courseName=' + form.course +'&cardType=' + form.cardType + '&role=' + form.role + '&indexNumber=' + form.indexNumber,  {
      firstName: form.firstName,
      lastName: form.lastName,
      password : form.password,
      username: form.username,
      gender : form.gender,
      dateOfBirth : date,
      placeOfBirth : form.placeOfBirth,
      stateOfBirth : form.stateOfBirth,
      residence_address : form.residence_address,
      city : form.city,
      emailAddress: form.emailAddress,
      phoneNumber : form.phoneNumber,
      mobilePhoneNumber :form.mobilePhoneNumber,
      parentName : form.parentName,
      citizenship : form.citizenship,
      ethnicity: form.ethnicity,
      }, httpOptions);


    }



}
