// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Remplacez par l'URL de votre serveur
  }

  listen(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
