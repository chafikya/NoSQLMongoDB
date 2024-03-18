import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user: any) {
    return this.http.post<any>(`${this.URL}/signup`, user);
  }
  
  // Method to retrieve user ID
  getUserId(): Observable<string> {
    // Assuming your API endpoint returns the user ID
    return this.http.get<string>(`${this.URL}/user/id`);
  }


  signInUser(user: any) {
    return this.http.post<any>(`${this.URL}/signin`, user);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/users`);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
