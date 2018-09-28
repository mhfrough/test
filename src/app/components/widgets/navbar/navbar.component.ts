import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDisabled: boolean = true;
  constructor(public nav: NavbarService,
    public navTitle: AppComponent,
    public auth: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut();
  }

}
