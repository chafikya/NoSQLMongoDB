import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { ChatComponent } from './component/chat/chat.component';
import { BoxComponent } from './component/box/box.component';

const routes: Routes = [
{
  path: '',
  redirectTo: '/signup', // Redirection vers le composant SignupComponent par défaut
  pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'box/:userId', // Specify the parameter userId
    component: BoxComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
