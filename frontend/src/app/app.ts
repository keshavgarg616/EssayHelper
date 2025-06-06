import { Component } from '@angular/core';
import { ChatbotComponent } from "./chatbot";

@Component({
  selector: 'app-root',
  imports: [ChatbotComponent],
  template: `<app-chatbot />`,
})
export class App {
}
