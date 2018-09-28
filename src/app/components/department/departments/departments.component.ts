import { Component, OnInit } from '@angular/core';
import { DeptRequest, DeptPut, DeptDelete } from '../../../interfaces/department';
import { DepartmentsService } from '../../../services/department/departments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  deptRequest: DeptRequest;
  deptPut: DeptPut;
  deptDelete: DeptDelete;

  rForm: FormGroup;
  dismissible = true;
  alerts: any[] = [];
  isLoading: Boolean = false;

  id: String = '';
  name: String = '';
  button: String = 'Submit';
  isUpdate: boolean = false;

  constructor(public _dept: DepartmentsService,
    public fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.required]
    });
  }

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
  onSubmit(post) {
    this.getAllDept();
    this.isLoading = true;

    if (!this.isUpdate) {
      this.deptRequest = {
        name: post.name,
        companyId: localStorage.getItem('companyID')
      }

      this._dept.createDept(this.deptRequest).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          // Department Creation Successful
          this.alerts.push({
            type: 'success',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDept();
        } else {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    } else {
      this.deptPut = {
        id: this.id,
        name: post.name
      }

      this._dept.updateDept(this.deptPut).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          // Department Update Successful
          this.alerts.push({
            type: 'info',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDept();
        } else {
          this.isLoading = false;
          console.log(res);
          this.alerts.push({
            type: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    }
    this.rForm.reset();
    this.button = 'submit';

  }

  onUpdate(id: String, name: String) {
    this.button = 'Update';
    this.id = id;
    this.name = name;
    this.rForm.reset();
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.isLoading = true;
    this.deptDelete = {
      id: id
    }

    this._dept.deleteDept(this.deptDelete).subscribe(res => {
      // Department Deleted
      this.isLoading = false;
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
      this.getAllDept();
    });

    this.rForm.reset();
  }

  reload() {
    window.location.reload();
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
