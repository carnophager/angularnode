import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private user_service: UserService) {

  }

  onRegister(form: NgForm) {
    console.log(form.value.email);
    const email = form.value.email;
    const pass = form.value.password;
    this.user_service.createUser(email, pass).subscribe(response => {
        console.log('registration request sent through http post service');
      }, error => {
        console.log(error);
      }
    );
  }
}
