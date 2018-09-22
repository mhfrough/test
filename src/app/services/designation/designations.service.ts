import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DesignationRequest, DesignationDelete } from '../../interfaces/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  desigList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getDesignation(data: String) {
    this.desigList = [];
    return this.http.get<any>(this.apiURL + '/get-designations?companyId=' + data)
    .subscribe(res => {
      res.data.forEach(element => {
        this.desigList.push(element);
      });
    })
  }

  createDesignation(data: DesignationRequest) {
    return this.http.post<any>(this.apiURL + '/create-designation', data)
  }

  deleteDesignation(data: DesignationDelete) {
    console.log(data);
    return this.http.post<any>(this.apiURL + '/delete-designation', data);
  }
}
