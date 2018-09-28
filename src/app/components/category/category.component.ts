import { Component, OnInit } from '@angular/core';
import { CatRequest, CatUpdate, CatDelete } from '../../interfaces/category';
import { CategoriesService } from '../../services/category/categories.service';
import { DepartmentsService } from '../../services/department/departments.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catRequest: CatRequest;
  catUpdate: CatUpdate;
  catDelete: CatDelete;

  id: String = "";
  name: String = "";
  isUpdate: boolean = false;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;

  constructor(public _cat: CategoriesService,
    public _dept: DepartmentsService) { }

  ngOnInit() {
    this._dept.getDept(localStorage.getItem('companyID'));
    this.getAllCat();
  }

  onChange(data){
    console.log(data);
    this._cat.getCat(data);
  }

  getAllCat() {
    this._cat.getCat("");
  }

  onSubmit(event) {
    this.isDisabled = true;
    this.isLoading = true;
    event.preventDefault();
    const target = event.target;

    if(!this.isUpdate) {
      this.catRequest = {
        name: target.querySelector('#catName').value,
        deptId : target.querySelector('#deptName').value,
      }

      this._cat.createCat(this.catRequest).subscribe(res => {
        console.log(12);
        console.log(res);
        if(res.status == 1) {
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
      this.catUpdate = {
        name: target.querySelector('#catName').value,
        categoryId: target.querySelector('#catId').value,
      }

      this._cat.updateCat(this.catUpdate).subscribe(res => {
        if(res.status == 1) {
          this.alerts.push({
            type: 'info',
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

    this.isUpdate = false;
    this.isLoading = false;
    this.isDisabled = false;
    
  }

  onUpdate(id: String, name: String) {
    this.id = id;
    this.name = name;
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.catDelete = {
      categoryId: id
    }
    this._cat.deleteCat(this.catDelete).subscribe(res => {
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
