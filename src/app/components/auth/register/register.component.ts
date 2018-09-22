import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RegisterRequest } from '../../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequest;

  constructor(private nav: NavbarService,
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

    this.registerRequest = {
      name: target.querySelector('#companyName').value,
      email: target.querySelector('#email').value,
      domain: target.querySelector('#domain').value,
      password: target.querySelector('#password').value,
      deviceType: 'none',
      deviceToken: 'none'
    }

    this._auth.register(this.registerRequest).subscribe(response => {
      if(response.message == "Sign up successful") {
        console.log(true);
        localStorage.setItem('loginStatus', "True");
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('companyID', response.data.companyId);
        localStorage.setItem('companyName', response.data.companyName);
        this.router.navigate(['']);
      }
      console.log(response); 
    })


    // this._auth.register(name,email,password,domain,'none','none');
  }

}
