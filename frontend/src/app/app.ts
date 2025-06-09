import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot';
import { LoginManagerComponent } from './loginManager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent, LoginManagerComponent, ReactiveFormsModule ],
  templateUrl: './app.html',
})
export class AppComponent {
  isLoggedIn = false;

  onLoginStatusChanged(status: boolean) {
    this.isLoggedIn = status;
  }
}
