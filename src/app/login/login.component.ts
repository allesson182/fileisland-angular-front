// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const loginSuccessful = this.authService.login(this.username, this.password, this.rememberMe);

    if (loginSuccessful) {
      // Redirecione para a página principal ou faça qualquer outra ação necessária após o login
      console.log('Login bem-sucedido!');
    } else {
      console.log('Credenciais inválidas');
    }
  }
}
