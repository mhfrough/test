import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { LoginRequest } from '../../../interfaces/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  dismissible = true;
  alerts: any[] = [];
  isLoading: Boolean = false;
  loginRequest: LoginRequest;

  constructor(private nav: NavbarService,
    private _auth: AuthenticationService,
    private router: Router,
    public fb: FormBuilder) {
    this.rForm = fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    });
  }

  ngOnInit() {
    this.nav.hide();
    if (localStorage.getItem('loginStatus') == "True") {
      // Redirect to Home Page
      this.router.navigate(['']);
    }
  }

  onSubmit(post) {
    this.isLoading = true;

    this.loginRequest = {
      email: post.email,
      password: post.password,
      deviceType: 'none',
      deviceToken: 'none'
    }

    this._auth.login(this.loginRequest).subscribe(res => {
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
        this.delay(1000).then(any => {
          this.router.navigate(['']);
        });
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

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}