import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../../services/department/departments.service';
import { EmpRequest, EmpDelete, EmpUpdate } from '../../../interfaces/employee';
import { EmployeesService } from '../../../services/employee/employees.service';
import { RolesService } from '../../../services/role/roles.service';
import { DesignationsService } from '../../../services/designation/designations.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  empRequest: EmpRequest;
  empUpdate: EmpUpdate;
  empDelete: EmpDelete;

  id: String = "";
  empName: String = "";
  empEmail: String = "";
  empPassword: String = "";
  empDept: String = "";
  empMgr: String = "";
  isUpdate: boolean = false;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;

  constructor(private _emp: EmployeesService,
    private _dept: DepartmentsService,
    private _role: RolesService,
    private _desig: DesignationsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
    this._desig.getDesignation(localStorage.getItem('companyID'));
    this._role.getRole();
  }

  getAllEmp() {
    this.isLoading = true;
    this._emp.getEmp(localStorage.getItem('companyID'));
    this.isLoading = false;
  }

  onChange(data) {
    this._emp.getEmp(data);
    console.log(data);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;

    if(!this.isUpdate) {
      this.empRequest = {
        name: target.querySelector('#empName').value,
        email: target.querySelector('#empEmail').value,
        password: target.querySelector('#empPassword').value,
        deviceType: 'none',
        deviceToken: 'none',
        deptId: target.querySelector('#empDept').value,
        mgr: target.querySelector('#empMgr').value,
        roleId: target.querySelector('#empRole').value,
        designationId: target.querySelector('#empDesig').value,
      }

      this._emp.createEmp(this.empRequest).subscribe(res => {
        console.log(res)
        if(res.status == 1) {
          console.log(res);
          this.alerts.push({
            type: 'success',
            msg: `${res.message}`,
            timeout: 5000
          });
        } else {
          this.alerts.push({
            type: 'danger',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      })
    } else {
      this.empUpdate = {
        userId: '0',
        name: target.querySelector('#empName').value,
        email: target.querySelector('#empEmail').value,
        deptId: target.querySelector('#deptName').value,
        password: target.querySelector('#empPassword').value,
        mgr: '0'
      }

      this._emp.updateEmp(this.empUpdate).subscribe(res => {
        if(res.status == 1) {
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

  }

  onUpdate(id: String, name: String, email: String, password: String
    , deptId: String, mgr: String) {
    this.id = id;
    this.empName = name;
    this.empEmail = email;
    this.empDept = deptId
    this.empPassword = password;
    this.empMgr = mgr;
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.empDelete = {
      userId: id
    }
    this._emp.deleteEmp(this.empDelete).subscribe(res => {
      // Department Deleted
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
    })

  }

  reload() {
    window.location.reload();
  }

}