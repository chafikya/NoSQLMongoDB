// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private url = 'http://localhost:3000'; // URL de votre serveur, ajustez selon votre configuration

  constructor() {
    this.socket = io(this.url);
  }

  // Dans socket.service.ts


listen(eventName: string): Observable<any> { // Utilisez Observable<string[]> si le type est toujours un tableau de strings
  return new Observable((subscriber) => {
    this.socket.on(eventName, (data: any) => {
      subscriber.next(data);
    });
  });
}


  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
