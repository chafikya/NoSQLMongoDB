import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Compoennts
import { TasksComponent } from './component/tasks/tasks.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { PrivateTasksComponent } from './component/private-tasks/private-tasks.component';
import { AuthGuard} from './auth.guard';

const routes: Routes = [
{
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'private',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
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
