import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor(private http : HttpClient) { }

  signOut() {
    window.localStorage.clear();
    this.http.get("http://localhost:8080/logout")
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public getAuthorities(){
    return JSON.parse(localStorage.getItem(USER_KEY)).authorities[1];
  }

  public getUsername(){
    return JSON.parse(JSON.parse(localStorage.getItem('auth-user')).username);
  }

  public selectedAccount(selectedAccount){


    window.localStorage.setItem('selectedAccount', JSON.stringify(selectedAccount));
  }
}
