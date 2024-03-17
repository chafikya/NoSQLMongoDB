import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedisService } from '../../services/redis.service'; // Import Redis service

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
    private redisService: RedisService // Inject RedisService
  ) {}

  ngOnInit() {}

  signIn() {
    // Check access using Redis before signing in
    this.redisService.checkAccess(this.user.email, this.user.password).subscribe(
      res => {
        if (res === 'blocked') {
          this.snackBar.open('You are blocked due to multiple login attempts. Please try again later.', 'Close', {
            duration: 3000
          });
        } else if (res !== '0') {
          this.snackBar.open(`You have exceeded login attempts. Please try again after ${res} seconds.`, 'Close', {
            duration: 3000
          });
        } else {
          // Proceed with signing in
          this.authService.signInUser(this.user).subscribe(
            res => {
              console.log(res);
              localStorage.setItem('token', res.token);
              this.router.navigate(['/chat']);
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
      },
      err => {
        console.error(err);
        this.snackBar.open('An error occurred while checking access.', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
