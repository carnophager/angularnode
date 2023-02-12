import { Component } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public user_service: UserService) {
  }

  onLogout()
  {

    this.user_service.authenticated.next(false);
    localStorage.clear();
    console.log('navbar logout', this.user_service.authenticated.value);
    //this.user_service.changeAdmin(2);
  }
}
