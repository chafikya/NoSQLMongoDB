import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private router: Router) { }

  box(): void {
    // Redirect to the box component or chat page
    this.router.navigate(['/box']); // Change '/box' to the appropriate path
  }
}
