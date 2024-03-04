import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { AuthGuard} from './auth.guard';

const routes: Routes = [
{
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
   {
    path: 'user',
    component: UserComponent
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
