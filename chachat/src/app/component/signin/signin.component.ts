import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
  };

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  signIn() {
    this.authService.signInUser(this.user).subscribe(
      res => {
        if (res) {
          console.log(res);
          localStorage.setItem('token', res.token);
          
          // Retrieve user ID using the email from the response
          this.authService.getUserIdFromDatabase(res.email).subscribe(
            userIdRes => {
              if (userIdRes && userIdRes.userId) {
                localStorage.setItem('userId', userIdRes.userId);
                console.log('User ID:', userIdRes.userId); // Log the user ID to the console
                this.router.navigate(['/chat']);
              } else {
                console.error('User ID not found');
                this.snackBar.open('User ID not found.', 'Close', {
                  duration: 3000
                });
              }
            },
            userIdErr => {
              console.error(userIdErr);
              this.snackBar.open('Error fetching user ID from database.', 'Close', {
                duration: 3000
              });
            }
          );
        } else {
          console.error('Response is null');
          this.snackBar.open('An error occurred while signing in. Please try again.', 'Close', {
            duration: 3000
          });
        }
      },
      err => {
        console.error(err);
        let errorMessage = 'An error occurred while signing in.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000
        });
      }
    );
  }
}