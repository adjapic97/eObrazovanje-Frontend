import { Courses } from './../classes/Courses';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Role } from '../classes/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthServiceService, public router: Router, private http : HttpClient) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>("http://localhost:8080/api/manager/get-roles");

  }

  getCourses(): Observable<Courses[]>{
    return this.http.get<Courses[]>("http://localhost:8080/api/manager/get-courses");

  }
}
