import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  users: any[] = [];
  connectedUsers: any[] = []; // Pour stocker les utilisateurs connectés en temps réel

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private socketService: SocketService // Injection du SocketService
  ) {}

  ngOnInit(): void {
    // Récupérer les conversations et les utilisateurs
    this.fetchConversations();
    this.fetchUsers();
    
    // Écouter les utilisateurs connectés via le service de socket
    this.listenForConnectedUsers();

    // Authentifier l'utilisateur via le service de socket
    const email = this.authService.getUserEmail();
    if (email) {
      this.socketService.emit('authentifier', { email });
    }
  }

  // Méthode pour écouter les utilisateurs connectés
  listenForConnectedUsers(): void {
    this.socketService.listen('liste utilisateurs connectes', (users: any[]) => {
      // Filtrer les utilisateurs connectés en fonction des données reçues de Socket.IO
      this.connectedUsers = this.users.filter(user => {
        return users.some(socketUser => socketUser.email === user.email);
      });
    });
  }

  // Rediriger vers la boîte de discussion d'un utilisateur spécifique
  redirectToBox(user: any): void {
    this.router.navigate(['/box', user._id]);
  }

  // Récupérer les conversations de l'utilisateur actuel
  fetchConversations() {
    this.authService.getUserId().subscribe(
      (userId: string) => {
        this.userService.getConversations(userId).subscribe(
          (res: any) => {
            this.conversations = res.conversations;
          },
          (err) => {
            console.error(err);
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // Récupérer la liste des utilisateurs
  fetchUsers() {
    this.authService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Rediriger vers la boîte de discussion d'un utilisateur spécifique
  box(userId: string) {
    this.router.navigate(['/box', userId]);
  }

  // Obtenir les informations sur l'utilisateur connecté
  getConnectedUserInfo(connectedUserId: string) {
    // Trouver l'utilisateur dans le tableau `users` qui correspond à l'ID connecté
    return this.users.find(user => user._id === connectedUserId);
  }
}
