// auth.service.ts

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
      return this.http.post(environment.backend+'/login', {login: username, password: password});
  }
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('username') != null) {
      this.loggedIn = true;
      return true;
    }
    return false;
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
}
