import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedisService {
  private baseUrl = 'http://localhost:3000'; // Change the URL to your server address

  constructor(private http: HttpClient) {}

  checkAccess(email: string, password: string): Observable<any> {
    // Call the backend API to check access using Redis
    return this.http.post<any>(`${this.baseUrl}/check-access`, { email, password });
  }
}
