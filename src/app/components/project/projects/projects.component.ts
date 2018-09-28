import { Component, OnInit } from '@angular/core';
import { ProjRequest, ProjUpdate, ProjDelete, EmpProjReq } from '../../../interfaces/project';
import { ProjectsService } from '../../../services/project/projects.service';
import { CategoriesService } from '../../../services/category/categories.service';
import { DepartmentsService } from '../../../services/department/departments.service';
import { EmployeesService } from '../../../services/employee/employees.service';
import { DesignationsService } from '../../../services/designation/designations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projRequest: ProjRequest;
  projUpdate: ProjUpdate;
  projDelete: ProjDelete;

  empProjReq: EmpProjReq;

  isUpdate: boolean = false;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = true;

  constructor(public _proj: ProjectsService,
    public _cat: CategoriesService,
    public _dept: DepartmentsService,
    public _emp: EmployeesService,
    public _desig: DesignationsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
    this._desig.getDesignation(localStorage.getItem('companyID'));
    console.log(this._dept.deptList);
  }

  onChange(data) {
    console.log(data);
    this._cat.getCat(data);
  }

  onChangeEmp(data){
    console.log(data);
    this._emp.getEmp(data);
    this._proj.getProj(data);
  }

  onProjectSubmit(event) {
    // this.isDisabled = true;
    this.isLoading = true;
    event.preventDefault();
    const target = event.target;

    this.projRequest = {
      name: target.querySelector('#projName').value,
      description: target.querySelector('#projDes').value,
      projCatId: target.querySelector('#catId').value,
      deptId: target.querySelector('#deptId').value
    }

    this._proj.createDept(this.projRequest).subscribe(res => {
      console.log(res);
      if(res.status == 1) {
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
  }

  onEmployeeSubmit(event) {
    // this.isDi0d0`                sabled = true;
    this.isLoading = true;
    event.preventDefault();
    const target = event.target;
    
    this.empProjReq = {
      userId: target.querySelector('#empId').value,
      designationId: target.querySelector('#desigId').value,
      projId: target.querySelector('#projId').value,
    }

    this._proj.assignEmp(this.empProjReq).subscribe(res => {
      console.log(res);
      if(res.status == 1) {
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
  }

}
