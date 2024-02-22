import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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

  signUp() {
    console.log("Enter");
    console.log(this.user);
    this.authService.signUpUser(this.user)
        .subscribe(
            res => {
                console.log(res);
                localStorage.setItem('token', res.token);
                this.router.navigate(['/private']);
            },
            err => {
                console.log(err);
                if (err.status === 400) {
                    // Utiliser MatSnackBar pour afficher l'erreur
                    this.snackBar.open('L\'email existe déjà', 'Fermer', {
                        duration: 3000
                    });
                } else {
                    // Gérer d'autres erreurs
                    this.snackBar.open('Erreur lors de l\'inscription', 'Fermer', {
                        duration: 3000
                    });
                }
            }
        )
}


}
