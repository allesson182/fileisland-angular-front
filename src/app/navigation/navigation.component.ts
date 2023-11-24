import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  showFiller : boolean = false;
  show: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private routerService: Router, private snackBar: MatSnackBar) {}

  toShow() {
    this.show = !this.show;
  }
  logout() {
    this.authService.logout();
    this.routerService.navigate(['/login']);
    this.snackBar.open("Logout efetuado com sucesso!", 'Close', {duration: 1000});
  }
}
