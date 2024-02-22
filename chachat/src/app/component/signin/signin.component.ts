import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    email: String,
    password: String
  };

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signInUser(this.user)
        .subscribe(
            res => {
                console.log(res);
                localStorage.setItem('token', res.token);
                this.router.navigate(['/private']);
            },
            err => {
                console.error(err);
                let errorMessage = 'Une erreur est survenue lors de la connexion.';
                if (err.error && err.error.message) {
                    errorMessage = err.error.message;
                }
                this.snackBar.open(errorMessage, 'Fermer', {
                    duration: 3000
                });
            }
        );
  }
}