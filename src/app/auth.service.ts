// auth.service.ts

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./services/Http.Service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;


  constructor(private http: HttpService) { }

  login(username: string, password: string): Observable<any> {
      return this.http.post('/login', {login: username, password: password});
  }
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.loggedIn = false;
  }

  isLoggedIn() {
    this.loggedIn = false;
    return this.http.get('/isLoggedIn' );
  }

  private validateCredentials(username: string, password: string): boolean {
    return true;
  }

  saveUserOnLocalStorage(username: string, token: string, email: string, id: number): void {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id.toString());
    this.loggedIn = true;
  }

  createUser(username: string, password: string, email: string) {

    return this.http.post('/user/create', {username: username, password: password, email: email});

  }
}
