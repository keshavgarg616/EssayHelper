import { Component } from '@angular/core';
import { ChatbotComponent } from "./chatbot/chatbot";
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ChatbotComponent],
  template: `<app-chatbot />`,
})
export class App {
}
