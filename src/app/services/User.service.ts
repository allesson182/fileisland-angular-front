import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {User} from "../entity/User";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
  constructor(private authService: AuthService) { }
  public getLoggedUser(): User{
    var user = new User();
    user.name = localStorage.getItem('username');
    user.email = localStorage.getItem('email');
    user.token = localStorage.getItem('token');
    user.id = Number.parseInt(localStorage.getItem('id'));
    return user;
  }





}
