import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { DeptRequest, DeptPut, DeptDelete } from '../../../interfaces/department';
import { DepartmentsService } from '../../../services/department/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  deptRequest: DeptRequest;
  deptPut: DeptPut;
  deptDelete: DeptDelete;
  
  // Update values
  id: String = "";
  name: String = "";
  isUpdate: boolean = false;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;

  constructor(private nav: NavbarService,
    private _dept: DepartmentsService) { }

  ngOnInit() {
    this.getAllDept();
    console.log(this._dept.deptList);
  }

  // Get All Departments
  getAllDept() {
    this.isLoading = true;
    this._dept.getDept(localStorage.getItem('companyID'));
    this.isLoading = false;
  }

  // Add New Department
  onSubmit(event) {
    this.isDisabled = true;
    this.isLoading = true;
    event.preventDefault();
    const target = event.target;

    if(!this.isUpdate) {
      this.deptRequest = {
        name: target.querySelector('#deptName').value,
        companyId: localStorage.getItem('companyID')
      }

      this._dept.createDept(this.deptRequest).subscribe(res => {
        if(res.status == 1) {
          console.log(res);
          // Department Creation Successful
          this.alerts.push({
              type: 'success',
              msg: `${res.message}`,
              timeout: 5000
            });
        } else {
            this.alerts.push({
              type: 'warning',
              msg: `${res.message}`,
              timeout: 5000
            });
        }
      })
    } else {
      this.deptPut = {
        id: this.id,
        name: target.querySelector('#deptName').value
      }

      this._dept.updateDept(this.deptPut).subscribe(res => {
        if(res.status == 1) {
          // Department Update Successful
          this.alerts.push({
            type: 'info',
            msg: `${res.message}`,
            timeout: 5000
          });
        } else {
          this.alerts.push({
            type: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      })
    }

    this.isUpdate = false;
    this.isLoading = false;
    this.isDisabled = false;

    this.getAllDept();
  }

  onUpdate(id: String, name: String) {
    this.id = id;
    this.name = name;
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.deptDelete = {
      id: id
    }
    this._dept.deleteDept(this.deptDelete).subscribe(res => {
      // Department Deleted
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
    })

    this.getAllDept();
  }

  reload() {
    window.location.reload();
  }

}
