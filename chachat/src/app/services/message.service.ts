import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/api'; // Update the base URL

  constructor(private http: HttpClient) {}

  getMessages(senderId: string, recipientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages?senderId=${senderId}&recipientId=${recipientId}`); // Update the URL
  }

  postMessage(senderId: string, recipientId: string, content: string): Observable<any> {
    const body = { senderId, recipientId, content };
    return this.http.post<any>(`${this.apiUrl}/messages`, body); // Update the URL
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`); // Assuming user details are fetched from /users/:userId endpoint
  }
}
