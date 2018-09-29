import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../../services/department/departments.service';
import { EmployeesService } from '../../../services/employee/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {


  constructor(public _dept: DepartmentsService,
    public _emp: EmployeesService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
    this._emp.getAllEmp(localStorage.getItem('companyID'));
  }

  onChange(data) {
    console.log(data);
    this._emp.getEmp(data);
  }

}
