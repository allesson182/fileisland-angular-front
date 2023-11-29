import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  constructor(private authService: AuthService, private routerService: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.createUser(this.username, this.password, this.email).subscribe((data) => {
      this.routerService.navigate(['/login']);
      this.snackBar.open("User created successfully!", 'Close', {duration: 1000});
    }, error => {
      console.log(error);
      this.snackBar.open("Error creating user!", 'Close', {duration: 1000});
    });

  }

  loginRedirect() {
    this.routerService.navigate(['/login'])
  }
}
