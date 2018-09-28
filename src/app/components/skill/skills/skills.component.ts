import { Component, OnInit } from '@angular/core';
import { SkillReq, SkillDel } from '../../../interfaces/skill';
import { DepartmentsService } from '../../../services/department/departments.service';
import { SkillsService } from '../../../services/skill/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillReq: SkillReq;
  skillDel: SkillDel;

  alerts: any[] = [];
  isUpdate: boolean = false;

  constructor(public _dept: DepartmentsService,
    public _skill: SkillsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
    this._skill.getSkill("");
  }

  onChange(data) {
    console.log(data);
    this._skill.getSkill(data);
    console.log(this._skill.skillList[0]);
  }

  onSubmit(event) {

    event.preventDefault();
    const target = event.target;

    if (!this.isUpdate) {
      this.skillReq = {
        name: target.querySelector('#skillName').value,
        deptId: target.querySelector('#deptName').value,
      }

      this._skill.createSkill(this.skillReq).subscribe(res => {
        console.log(res);
        if (res.status == 1) {
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
      
    }

  }

  onDelete(id: String) {
    this.skillDel = {
      skillId: id
    }
    this._skill.deleteSkill(this.skillDel).subscribe(res => {
      // Department Deleted
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
    })

    // this.getAllDept();
  }

  reload() {
    window.location.reload();
  }



}
