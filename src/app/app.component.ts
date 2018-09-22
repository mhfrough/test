import { Component } from '@angular/core';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fyp';
  companyName: String;

  constructor(private nav: NavbarService,
    private router: Router) {

  }

  ngOnInit() {

    if(localStorage.getItem('loginStatus') != "True") {
      // Redirect to Login Page
      this.router.navigate(['/auth/login']);
    }
    
    this.companyName = localStorage.getItem('companyName');
    console.log(this.companyName);
    
  }

}
