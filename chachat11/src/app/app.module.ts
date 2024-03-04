import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ChatComponent } from './component/chat/chat.component';
import { HistoryComponent } from './component/history/history.component';
import { UserComponent } from '../../../chachat/src/app/component/user/user.component';

@NgModule({
  declarations: [
    ChatComponent,
    UserComponent,
    AppComponent,
    LoginComponent,
    UserListComponent,
    ChatComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
