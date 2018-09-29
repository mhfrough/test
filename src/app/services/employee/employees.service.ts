import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmpRequest, EmpUpdate, EmpDelete } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  empList: String[] = [];
  allEmpList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getEmp(data: String) {
    this.empList = [];
    return this.http.get<any>(this.apiURL + '/get-empls-from-dept?deptId=' + data)
      .subscribe(res => {
        console.log(1);
        console.log(res);
        res.data.forEach(element => {
          this.empList.push(element);
        });
      })
  }

  getAllEmp(data: String) {
    this.allEmpList = [];
    return this.http.get<any>(this.apiURL + '/get-all-empls?companyId=' + data)
    .subscribe(res => {
      console.log("get all emp");
      console.log(res);
      res.data.forEach(element => {
        this.allEmpList.push(element);
      });
    })
  }

  createEmp(data: EmpRequest) {
    return this.http.post<any>(this.apiURL + '/add-empl-to-dept', data);
  }

  updateEmp(data: EmpUpdate) {
    return this.http.post<any>(this.apiURL + '/update-emp-in-dept', data);
  }

  deleteEmp(data: EmpDelete) {
    return this.http.post<any>(this.apiURL + '/delete-emp-from-dept', data);
  }

}
