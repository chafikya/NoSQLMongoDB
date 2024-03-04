import { Component } from '@angular/core';

interface Message {
  from: string;
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  conversations = []; // Remplacer par les données réelles
  currentMessages = []; // Les messages de la conversation actuelle
  messages: Message[] = [];
  newMessage: string = '';
  constructor() { }


  sendMessage() {
    // Logique pour envoyer `newMessage` à la conversation actuelle
    this.newMessage = ''; // Réinitialiser l'entrée après l'envoi
  }
  

}
