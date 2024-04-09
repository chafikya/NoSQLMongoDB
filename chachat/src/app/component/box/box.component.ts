import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  messages: any[] = [];
  senderId: string | null = null;
  recipientId: string | null = null;
  sender: any;
  recipient: any;
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.senderId = '65f5a365c1a09252e48ac08c';
      console.log('Sender ID from localStorage:', this.senderId); // Log the value obtained from localStorage
      this.recipientId = params.get('userId'); 
      this.fetchMessages();
    });
  }
  
  fetchMessages() {
    if (this.senderId !== null && this.recipientId !== null) {
      this.messageService.getMessages(this.senderId, this.recipientId).subscribe(
        (messages: any[]) => {
          // Filter messages exchanged between sender and recipient
          this.messages = messages.filter(message => 
            (message.sender === this.senderId && message.recipient === this.recipientId) ||
            (message.sender === this.recipientId && message.recipient === this.senderId)
          ).map((message, index) => {
            return { 
              ...message, 
              messageId: index + 1,
              senderId: message.sender,
              recipientId: message.recipient
            };
          });
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    } else {
      console.error('Sender ID or recipient ID is null.');
    }
  }

  onSubmit() {
    if (this.senderId !== null && this.recipientId !== null && this.newMessageContent.trim() !== '') {
      this.messageService.postMessage(this.senderId, this.recipientId, this.newMessageContent).subscribe(
        () => {
          // Clear the input field and fetch messages again
          this.newMessageContent = '';
          this.fetchMessages();
        },
        (error) => {
          console.error('Error posting message:', error);
        }
      );
    }
  }
}
