import { Component, OnInit } from '@angular/core';
import { TaskReq } from '../../../interfaces/task';
import { TasksService } from '../../../services/task/tasks.service';
import { ProjectsService } from '../../../services/project/projects.service';
import { DepartmentsService } from '../../../services/department/departments.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskReq: TaskReq;

  alerts: any[] = [];
  constructor(private _task: TasksService,
    private _proj: ProjectsService,
    private _dept: DepartmentsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
  }

  onChange(data) {
    console.log(data);
    this._proj.getProj(data);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;

    this.taskReq = {
      projId: target.querySelector('#projId').value,
      name: target.querySelector('#taskName').value,
      description: target.querySelector('#taskDes').value,
      estimated_time: target.querySelector('#date').value,
      priority: target.querySelector('#priority').value,
      required_skills: target.querySelector('#skill').value
    }

    this._task.createTask(this.taskReq).subscribe(res => {
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
