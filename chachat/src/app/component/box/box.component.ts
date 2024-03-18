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
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.senderId = 'your_sender_id'; // Set the sender ID
      this.recipientId = params.get('userId'); // Get the recipient ID from the route parameter
      this.fetchMessages();
    });
  }

  fetchMessages() {
    if (this.senderId !== null && this.recipientId !== null) {
      this.messageService.getMessages(this.senderId, this.recipientId).subscribe(
        (messages: any[]) => {
          this.messages = messages;
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
