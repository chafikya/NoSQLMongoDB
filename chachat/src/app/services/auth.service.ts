import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router, private socketService: SocketService) { }

  signUpUser(user: any) {
    return this.http.post<any>(`${this.URL}/signup`, user);
  }
  
  // Method to retrieve user ID
  getUserId(): Observable<string> {
    // Assuming your API endpoint returns the user ID
    return this.http.get<string>(`${this.URL}/user/id`);
  }

  getUserEmail(): string {
    return localStorage.getItem('userEmail')  || '';
  }


  signInUser(user: any) {
    return this.http.post<any>(`${this.URL}/signin`, user).pipe(
      tap(res => {
        localStorage.setItem('userEmail', user.email); // Stocke l'email après une connexion réussie
        localStorage.setItem('token', res.token); // Suppose que le backend renvoie un token
      })
    );
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/users`);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Déconnexion de l'utilisateur. Émission de l'événement 'user-disconnect'.");
    this.socketService.emit('user-disconnect','');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
