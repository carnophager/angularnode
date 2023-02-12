import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post('http://localhost:3000/api/user/signup', authData)
  }

  loginUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post<{token: string, email: string, expiresIn: any, admin: any}>('http://localhost:3000/api/user/login', authData)
  }
  saveUserData(token: string, email: string, expiration: Date, admin: any)
  {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('expiration', expiration.toString());
    localStorage.setItem('admin', admin);
  }
  getUserData()
  {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const expiration = localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');
    if ( !token || !expiration)
    {
      return;
    }
    return {
      token: token,
      email: email,
      expirationDate: new Date(expiration),
      admin: admin
    }
  }

  setTimer(duration: any)
  {
    this.tokenTimer = setTimeout(() => {this.onLogout()}, duration * 1000);
  }

  onLogout()
  {
    this.authenticated.next(false);
    clearTimeout(this.tokenTimer);
    //this.changeAdmin(0);
    //this.changeAdmin(0);
    localStorage.clear();
    //this.router.navigate(['']);
  }


}
