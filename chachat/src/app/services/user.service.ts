import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Adjust this URL to match your backend server

  constructor(private http: HttpClient) {}

  getConversations(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}/conversations`);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

}
