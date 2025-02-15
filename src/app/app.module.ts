import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FileDragNDropDirective} from "./home/file-drag-n-drop.directive";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CreateUserComponent,
    LoginComponent,
    FileDragNDropDirective

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatListModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        NgbModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatProgressBarModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
