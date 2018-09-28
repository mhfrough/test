import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeptRequest, DeptPut, DeptDelete } from '../../interfaces/department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  deptList: any[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getDept(data: String) {
    console.log("Get Department");
    this.deptList = [];
    return this.http.get<any>(this.apiURL + '/get-departments?companyId=' + data
    ).subscribe(res => {
      res.data.forEach(element => {
        this.deptList.push(element);
      });
    })
  }

  createDept(data: DeptRequest) {
    return this.http.post<any>(this.apiURL + '/create-department', data);
  }

  updateDept(data: DeptPut) {
    return this.http.post<any>(this.apiURL + '/update-department', data);
  }

  deleteDept(data: DeptDelete) {
    return this.http.post<any>(this.apiURL + '/delete-department', data);
  }

}
