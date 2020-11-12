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
    window.sessionStorage.clear();
    this.http.get("http://localhost:8080/logout")
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getAuthorities(){
    return JSON.parse(sessionStorage.getItem(USER_KEY)).authorities[1];
  }

  public getUsername(){
    return JSON.parse(JSON.parse(sessionStorage.getItem('auth-user')).username);
  }

  public selectedAccount(selectedAccount){


    window.sessionStorage.setItem('selectedAccount', JSON.stringify(selectedAccount));
  }
}
