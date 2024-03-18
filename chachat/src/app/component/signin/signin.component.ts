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
}
