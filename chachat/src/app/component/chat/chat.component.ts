import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  users: any[] = []; // Array to store user data

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchConversations();
    this.fetchUsers(); // Fetch users when the component initializes
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
