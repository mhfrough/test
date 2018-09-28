import { Component, OnInit } from '@angular/core';
import { TaskReq } from '../../../interfaces/task';
import { TasksService } from '../../../services/task/tasks.service';
import { ProjectsService } from '../../../services/project/projects.service';
import { DepartmentsService } from '../../../services/department/departments.service';
import { SkillsService } from '../../../services/skill/skills.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskReq: TaskReq;
  selectedSkills: any[];

  alerts: any[] = [];
  constructor(public _task: TasksService,
    public _proj: ProjectsService,
    public _dept: DepartmentsService,
    public _skill: SkillsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
  }

  onChange(data) {
    console.log(data);
    this._proj.getProj(data);
    this._skill.getSkill(data);
  }

  clickedOption() {
    console.log(this.selectedSkills)
  }

  onSubmit(event) {

    
    event.preventDefault();
    const target = event.target;

console.log(this.selectedSkills.toString());

    this.taskReq = {
      projId: target.querySelector('#projId').value,
      name: target.querySelector('#taskName').value,
      description: target.querySelector('#taskDes').value,
      estimated_time: target.querySelector('#date').value,
      priority: target.querySelector('#priority').value,
      required_skills: this.selectedSkills.toString()
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
