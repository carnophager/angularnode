import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent
{
  auth: any;
  token: any;
  email: any;
  constructor (public user_service: UserService, private router: Router, private navbar: NavbarComponent)
  {

  }

  ngOnInit() {
    this.user_service.authenticated.subscribe(res => {
      this.auth = res;
    });

    this.autoAuthUser();
  }
  onLogin(form: NgForm) {
   const email = form.value.email;
   const password = form.value.password;
   this.user_service.loginUser(email, password).subscribe(result=>{
      this.user_service.authenticated.next(true);
      const admin = result.admin;
      const token = result.token;
      this.user_service.isAdmin.next(admin);
      const expires = result.expiresIn;
      if ( token ) {
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expires * 1000);
        this.user_service.saveUserData(token, result.email, expirationDate, admin);
        this.router.navigate(['/main']);
      }
   },
     (error) => {                              //Error callback
       console.error('error caught in component', error);
     });
  }

  autoAuthUser()
  {
    const authinfo = this.user_service.getUserData();

    if (!authinfo)
    {
      return;
    }
    console.log(authinfo.email, 'authinfo')
    const now = new Date();
    const expiresIn = authinfo.expirationDate.getTime() - now.getTime();
    if ( expiresIn > 0 )
    {
      this.token = authinfo.token;
      this.user_service.authenticated.next(true);
      this.email = authinfo.email;
      console.log(authinfo, 'authinfo YES')
    }
  }

  onLogout()
  {
    this.navbar.onLogout();
  }
}
