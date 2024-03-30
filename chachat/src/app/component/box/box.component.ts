// box.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  messages: any[] = [];
  currentUserId: string = '';
  recipientId: string | null = null;
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId(); // Get the current user ID from AuthService
    this.route.paramMap.subscribe(params => {
      this.recipientId = params.get('userId'); // Get the recipient ID from the route parameter

      if (this.recipientId) {
        this.fetchMessages();
      }
    });
  }

  fetchMessages(): void {
    if (!this.currentUserId || !this.recipientId) {
      console.error('Sender ID or recipient ID is null.');
      return;
    }
  
    this.messageService.getMessages(this.currentUserId, this.recipientId).subscribe(
      (messages: any[]) => {
        this.messages = messages.map(message => ({
          ...message,
          isSent: message.sender === this.currentUserId
        }));
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.currentUserId || !this.recipientId || !this.newMessageContent.trim()) {
      return;
    }
  
    this.messageService.postMessage(this.currentUserId, this.recipientId, this.newMessageContent).subscribe(
      newMessage => {
        this.messages.push({
          ...newMessage,
          isSent: true // Since you're the sender of the new message
        });
        this.newMessageContent = ''; // Clear the input field
      },
      error => {
        console.error('Error posting message:', error);
      }
    );
  }
  
}

