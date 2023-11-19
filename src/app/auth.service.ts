// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(username: string, password: string, rememberMe: boolean): boolean {
    const isValid = this.validateCredentials(username, password);

    if (isValid) {
      this.loggedIn = true;

      if (rememberMe) {
        localStorage.setItem('username', username);
      }

      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('username');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  private validateCredentials(username: string, password: string): boolean {
    return username === 'user' && password === 'password';
  }
}
