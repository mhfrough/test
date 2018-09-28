import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar/navbar.service';
import { DesignationsService } from '../../services/designation/designations.service';
import { DesignationRequest, DesignationDelete } from '../../interfaces/designation';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  desigRequest: DesignationRequest;
  desigDelete: DesignationDelete;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;

  constructor(public _desig: DesignationsService) { }

  ngOnInit() {
    this.getAllDesig();
    console.log(this._desig.desigList)
  }

  getAllDesig() {
    this.isLoading = true;
    this._desig.getDesignation(localStorage.getItem('companyID'));
    this.isLoading = false;
  }

  onSubmit(event) {
    this.isDisabled = true;
    this.isLoading = true;

    event.preventDefault();
    const target = event.target;

    this.desigRequest = {
      companyId: localStorage.getItem('companyID'),
      name: target.querySelector('#desigName').value,
    }

    this._desig.createDesignation(this.desigRequest).subscribe(res => {
      if(res.status == 1) {
        console.log(res);
        this.alerts.push({
          type: 'success',
          msg: `${res.message}`,
          timeout: 5000
        });
      } else {
        console.log(res);
        this.alerts.push({
          type: 'warning',
          msg: `${res.message}`,
          timeout: 5000
        });
      }
    })

    this.isDisabled = false;
    this.isLoading = false;

    this.getAllDesig();
  }

  onDelete(id: String) {
    this.desigDelete = {
      designationId: id
    }
    this._desig.deleteDesignation(this.desigDelete).subscribe(res => {
      // Department Deleted
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
    })
  }

  reload() {
    window.location.reload();
  }

}
