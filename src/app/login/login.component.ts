// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/User.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private toast:MatSnackBar, private router: Router) {}

  onSubmit(): void {
     this.authService.login(this.username, this.password).subscribe((data) => {
        this.authService.saveUserOnLocalStorage(data.username, data.token, data.email, data.id);
        this.toast.open("Login efetuado com sucesso!", 'Close', {});
        this.router.navigate(['/home']);
     }, error => {
        console.log(error);
        this.toast.open("Erro ao efetuar login!", 'Close', {});
     });


  }
}
