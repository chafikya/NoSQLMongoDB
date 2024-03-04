import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ChatComponent } from './component/chat/chat.component';
import { HistoryComponent } from './component/history/history.component';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'user-list', component: UserListComponent },
  // Ajoutez d'autres routes ici pour d'autres composants
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
