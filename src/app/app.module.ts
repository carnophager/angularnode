import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./login/login.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UserService} from "./user.service";
import {HttpClientModule} from "@angular/common/http";
import {AdminService} from "./admin.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ManageReservationsComponent,
    CreateCarComponent,
    MainPageComponent,
    DatepickerComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'create-car', component: CreateCarComponent},
      {path: 'manage', component: ManageReservationsComponent},
      {path: 'users', component: AdminUsersComponent}
    ]),
    MatSidenavModule,
    MatListModule
  ],
  providers: [UserService, AdminService, LoginComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
