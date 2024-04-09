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
  userId: string | null = null;
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
    this.userId = localStorage.getItem('userId');
    this.fetchConversations();
    this.fetchUsers();
    this.listenForConnectedUsers();
  }

  listenForConnectedUsers(): void {
    this.socketService.listen('liste utilisateurs connectes', (users: any[]) => {
      this.connectedUsers = users; // Mettez à jour votre liste d'utilisateurs connectés ici
      console.log(this.connectedUsers);
    });
  }

  // Les autres méthodes restent inchangées...



  redirectToBox(userId: string) {
    this.router.navigate(['/box', userId]);
  }

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

  box(userId: string) {
    this.router.navigate(['/box', userId]);
  }
}
