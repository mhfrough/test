import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RegisterRequest } from '../../../interfaces/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  dismissible = true;
  alerts: any[] = [];
  isLoading: Boolean = false;

  registerRequest: RegisterRequest;

  constructor(private nav: NavbarService,
    private _auth: AuthenticationService,
    private router: Router,
    public fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'domain': [null, Validators.required],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    })
  }

  ngOnInit() {
    this.nav.hide();
    if (localStorage.getItem('loginStatus') == "True") {
      // Redirect to Home Page
      this.router.navigate(['']);
    }
  }

  onSubmit(post) {

    this.registerRequest = {
      name: post.name,
      email: post.email,
      domain: post.domain,
      password: post.password,
      deviceType: 'none',
      deviceToken: 'none'
    }

    this._auth.register(this.registerRequest).subscribe(res => {
      if (res.status == 1) {
        this.isLoading = false;
        console.log(res);
        this.alerts.push({
          type: 'success',
          msg: `${res.message}`,
          timeout: 5000
        });
        localStorage.setItem('loginStatus', "True");
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('companyID', res.data.companyId);
        localStorage.setItem('companyName', res.data.companyName);
        this.router.navigate(['']);
      } else {
        this.isLoading = false;
        this.alerts.push({
          type: 'warning',
          msg: `${res.message}`,
          timeout: 5000
        });
        console.log(res.message);
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
