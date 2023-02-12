import {Component, ViewChild} from '@angular/core';
import {AdminService} from "../admin.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  constructor(private adminservice: AdminService) {
  }
  displayedColumns = ['email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource();
  users : any;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild('table') table: MatTable<any>;
  fillTableData(users_data: any) {
    const ELEMENT_DATA: any[] = [];
    this.users = users_data;
    this.users.forEach((user:any) => {
      const email = user.email;
      const isAdmin = user.isAdmin;
      //console.log('UUUUU', email, isAdmin);
      ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
    })
    this.dataSource.data = ELEMENT_DATA;
    //this.dataSource.paginator = this.paginator;
  }
  ngOnInit()
  {
    this.adminservice.getUsers().subscribe(res => {
      this.fillTableData(res);
    });
  }

  onDeleteUser(element: any) {
    this.adminservice.deleteUser(element.email).subscribe( res => {
      this.fillTableData(res);
    });
  }

  promoteToAdmin(element: any) {
    this.adminservice.makeAdmin(element.email).subscribe(res => {
      this.fillTableData(res);
    });
  }
}
