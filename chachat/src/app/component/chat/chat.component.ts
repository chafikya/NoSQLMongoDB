import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  connectedUsers: string[] = []; // Pour stocker les utilisateurs connectés

  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.listen('liste utilisateurs connectes').subscribe((users: string[]) => {
      this.connectedUsers = users; // Mettre à jour la liste des utilisateurs connectés
    });
  }

  box(): void {
    // Redirection vers le composant ou la page de chat spécifique
    this.router.navigate(['/box']); // Ajustez le chemin selon votre application
  }
}
