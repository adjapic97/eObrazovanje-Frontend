import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const ACCOUNT_API = 'http://localhost:8080/api/accounts/updateAccount/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  getAccounts(page: number){
    return this.http.get<Account[]>('http://localhost:8080/api/accounts?page='+ page + '&size=10');
  }


  getAccount(id){
    return this.http.get<Account[]>('http://localhost:8080/api/accounts/'+ id);

  }

  getAccountForUser(id){
    return this.http.get<Account[]>('http://localhost:8080/api/accounts/forUser/' + id);
  }

}
