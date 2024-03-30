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
    this.fetchConversations();
    this.fetchUsers();
    this.listenForConnectedUsers();
  }

  listenForConnectedUsers(): void {
    this.socketService.listen('liste utilisateurs connectes', (users: any[]) => {
      this.connectedUsers = users.map(user => ({
        ...user,
        avatarPath: user.avatar ? `assets/avatar/${user.avatar}` : 'assets/avatar/penguin.png'
      }));
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
        // Assignez un avatar par défaut ici si l'utilisateur n'en a pas
        this.users = users.map(user => ({
          ...user,
          avatarPath: user.avatar ? `assets/avatar/${user.avatar}` : 'assets/avatar/penguin.png'
        }));
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
