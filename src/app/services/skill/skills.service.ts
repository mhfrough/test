import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SkillReq, SkillDel } from '../../interfaces/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  skillList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getSkill(data: String) {
    console.log("Get Skills")
    this.skillList = [];
    return this.http.get<any>(this.apiURL + '/get-skills-by-dept?deptId=' + data)
    .subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.skillList.push(element);
      });
    })
  }

  createSkill(data: SkillReq) {
    return this.http.post<any>(this.apiURL + '/create-skill', data);
  }
  
  deleteSkill(data: SkillDel) {
    return this.http.post<any>(this.apiURL + '/delete-skill', data);
  }
}
