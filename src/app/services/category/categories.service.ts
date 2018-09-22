import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CatRequest, CatUpdate, CatDelete } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  catList: String[] = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  getCat(data: String) {
    this.catList = [];
    return this.http.get<any>(this.apiURL + '/get-project-categories?deptId=' + data)
    .subscribe(res => {
      res.data.forEach(element => {
        this.catList.push(element);
      });
    })
  }

  createCat(data: CatRequest) {
    return this.http.post<any>(this.apiURL + '/create-project-category', data);
  }
  
  updateCat(data: CatUpdate) {
    return this.http.post<any>(this.apiURL + '/delete-project-category', data);
  }
  
  deleteCat(data: CatDelete) {
    return this.http.post<any>(this.apiURL + '/update-project-category', data);
  }

}
