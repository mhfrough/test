import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, RegisterRequest } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURL: String = 'https://arcmines.com/codexmatrix/public/api';
  constructor(private http: HttpClient, 
    private router: Router) { }

  // Sending Register Post Request to Server
  register(data: RegisterRequest) {
    return this.http.post<any>(this.apiURL + '/sign-up', data)
  }

  // Sending Login Post Request to Server
  login(data: LoginRequest) {
    return this.http.post<any>(this.apiURL + '/sign-in', data)
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}

