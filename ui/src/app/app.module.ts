import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookDetailsComponent,
    BooksListComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    AuthenticationButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'csci620.us.auth0.com',
      clientId: 'pF1XoMSehwLWuBwO72kY1x5bgL3lsBKv',
      audience: 'https://localhost:3000/books',
      httpInterceptor: {
        allowedList: [`${environment.apiUrl}/api/*`],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
