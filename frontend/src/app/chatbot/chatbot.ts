import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class ChatbotComponent {
  profileForm = new FormGroup({
    query: new FormControl('', Validators.required),
  });
  loading = false;

  history: { role: string; parts: { text: string }[] }[] = [];;
  response = "";
  handleSubmit() {
    let queryString = this.profileForm.value.query || "";
    this.profileForm.get('query')?.setValue('');
    this.send(queryString);
    this.history.push({
        role: "user",
        parts: [{ text: queryString }],
      });
  }
  constructor(private apiService: ApiService) { }

  send(userMessage: string) {
    this.loading = true;
    this.apiService.sendMessage(userMessage, this.history).subscribe({
      next: (response) => {
        this.response = response.reply; // Adjust based on your backend response
        this.history.push({
        role: "model",
        parts: [{ text: this.response }],
      });
      this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      },
    });
  }
}
