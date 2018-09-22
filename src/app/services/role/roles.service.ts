import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  roleList: String[] = [];
  constructor(private http: HttpClient) { }

  getRole() {
    return this.http.get<any>(this.apiURL + '/get-roles')
    .subscribe(res => {
      res.data.forEach(element => {
        this.roleList.push(element);
      });
    })
  }
}
