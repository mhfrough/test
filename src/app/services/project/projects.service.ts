import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjDelete, ProjUpdate, ProjRequest, EmpProjReq, EmpProjDel } from '../../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  projectList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

    // Create Project
    getProj(data: String) {
      this.projectList = [];
      return this.http.get<any>(this.apiURL + '/get-projects-by-department?deptId=' + data
      ).subscribe(res => {
        res.data.forEach(element => {
          this.projectList.push(element);
        });
      })
    }
  
    createDept(data: ProjRequest) {
      console.log(data);
      return this.http.post<any>(this.apiURL + '/create-project', data);
    }
    
    updateDept(data: ProjUpdate) {
      return this.http.post<any>(this.apiURL + '/update-project', data);
    }
    
    deleteDept(data: ProjDelete) {
      return this.http.post<any>(this.apiURL + '/delete-project', data);
    }

    // Assign Employee
    assignEmp(data: EmpProjReq) {
      console.log(data);
      return this.http.post<any>(this.apiURL + '/assign-emp-to-project', data);
    }

    deleteEmp(data: EmpProjDel) {
      return this.http.post<any>(this.apiURL + '/delete-emp-from-project', data);
    }
}
