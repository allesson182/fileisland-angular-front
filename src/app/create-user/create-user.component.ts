import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.createUser(this.username, this.password, this.email).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
    });

  }
}
