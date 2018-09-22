import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { LoginRequest } from '../../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;

  constructor(private nav:  NavbarService,
    private _auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.nav.hide();
    if(localStorage.getItem('loginStatus') == "True") {
      // Redirect to Home Page
      this.router.navigate(['']);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;

    this.loginRequest = {
      email: target.querySelector('#email').value,
      password: target.querySelector('#password').value,
      deviceType: 'none',
      deviceToken: 'none'
    }

    this._auth.login(this.loginRequest).subscribe(response => {
      if(response.message == "login successful") {
        console.log(true);
        localStorage.setItem('loginStatus', "True");
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('companyID', response.data.companyId);
        localStorage.setItem('companyName', response.data.companyName);
        this.router.navigate(['']);
      } else {
        console.log(response.message);
      }
    })
  }

}