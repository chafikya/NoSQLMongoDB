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

  signUpUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/signup`, user);
  }

  signInUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/signin`, user);
  }

  // Method to retrieve user ID from the database
  getUserIdFromDatabase(email: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/user/id?email=${email}`);
    // Adjust the endpoint according to your backend API
    // You might need to pass the email as a query parameter
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/users`);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): Observable<string> {
    return this.http.get<string>(`${this.URL}/user/id`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to retrieve user ID
  getUserId(): Observable<string> {
    // Assuming your API endpoint returns the user ID
    return this.http.get<string>(`${this.URL}/user/id`);
  }
}