import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  login() {
    // Ici, vous mettriez votre logique de vérification de l'authentification...
    // Si la connexion est réussie :
    this.router.navigate(['/chat']);
  }
  
  ngOnInit(): void {
  }

}
