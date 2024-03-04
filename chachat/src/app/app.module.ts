import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { SigninComponent } from './component/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { UserComponent } from './component/user/user.component';
import { ChatComponent } from './component/chat/chat.component';
=======
>>>>>>> parent of 044d69cb (cc)



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
<<<<<<< HEAD
    SigninComponent,
    UserComponent,
    ChatComponent
=======
    TasksComponent,
    PrivateTasksComponent,
    SigninComponent
>>>>>>> parent of 044d69cb (cc)
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
