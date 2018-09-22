import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/test/data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employees$: Object;

  constructor(private route: ActivatedRoute,
    private data: DataService) {
      this.route.params.subscribe(
        param => this.employees$ = param.id
      );
     }

  ngOnInit() {
    this.data.getUser(this.employees$).subscribe(
      data => this.employees$ = data
    );

    console.log(this.employees$);
  }

}
