import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TaskReq, TaskDel, TaskUpd } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  taskList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

    getDept(data: String) {
      this.taskList = [];
      return this.http.get<any>(this.apiURL + '/get-all-tasks-by-project?projId=' + data
      ).subscribe(res => {
        res.data.forEach(element => {
          this.taskList.push(element);
        });
      })
    }

    createTask(data: TaskReq) {
      console.log(data);
      return this.http.post<any>(this.apiURL + '/create-task', data);
    }
    
    updateTask(data: TaskUpd) {
      return this.http.post<any>(this.apiURL + '/update-department', data);
    }
    
    deleteTask(data: TaskDel) {
      return this.http.post<any>(this.apiURL + '/delete-task', data);
    }
  
}
