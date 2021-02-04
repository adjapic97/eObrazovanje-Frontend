import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelephoneMinus } from 'ngx-bootstrap-icons';
import { Observable } from 'rxjs';
import { FinancialCard } from 'src/app/classes/FinancialCard';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FinancialCardService {

  constructor(private http: HttpClient) { }


  getFinancialCardForStudent(): Observable<FinancialCard[]> {
    return this.http.get<FinancialCard[]>('http://localhost:8080/api/student/get-financial-card?studentId=' + JSON.parse(localStorage.getItem('auth-user')).id)
  }

}
