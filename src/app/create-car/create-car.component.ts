import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent {
  selectedFile: File = new File([""], "filename");
  fd = new FormData();
  constructor(private http: HttpClient, private adminservice: AdminService) {
  }
  onCreate(form: NgForm)
  {
    const filename = this.selectedFile.name;
    this.adminservice.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats, filename).subscribe(res => console.log("Create car Server response: ", res));
    form.resetForm();
  }

  onFileSelected(event:any)
  {
    console.log('image upload', event);

    this.selectedFile = event.srcElement.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);

    return this.http.post('http://localhost:3000/api/admin/save-image', this.fd).subscribe(response => {
      console.log('onFileSelected Server Response: ', response)
    }, error => {
      console.log("error on upload image", error);
    })
  }


}
