import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: string, seats: number, imgUrl: string)
  {
    const carData = {brand: brand, model: model, power: power, seats: seats, imgUrl: imgUrl};
    return this.http.post('http://localhost:3000/api/admin/create-car', carData);
  }

  getUsers()
  {
    return this.http.get('http://localhost:3000/api/admin/users');
  }

  deleteUser(email: string) {
    return this.http.delete('http://localhost:3000/api/admin/users/' + email);
  }

  makeAdmin(email: string) {
    return this.http.patch('http://localhost:3000/api/admin/users/' + email, {isAdmin: 1});
  }
}
