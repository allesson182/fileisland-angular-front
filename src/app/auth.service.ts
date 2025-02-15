// auth.service.ts

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./services/Http.Service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpService) { }

  login(username: string, password: string): Observable<any> {
      return this.http.post('/login', {login: username, password: password}, null, false);
  }
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }

  isLoggedIn() {
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
  }

  createUser(username: string, password: string, email: string) {

    return this.http.post('/user/create', {username: username, password: password, email: email}, null, false);

  }
}
