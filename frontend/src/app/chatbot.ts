import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from './api.service';
import { LoginManagerComponent } from './loginManager';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  standalone: true,
  styleUrls: ['./chatbot.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class ChatbotComponent {
  
  history: { role: string; parts: { text: string }[] }[] = [];
  constructor(private apiService: ApiService) { 
  this.apiService.getHistory(localStorage.getItem("email")!).subscribe({
    next: (response) => {
      console.log('History fetched successfully:', response);
      this.history = response.history || [];
      console.log('Fetched history:', response.history);
      console.log('History:', this.history);
    },
    error: (err) => {
      console.error('Error fetching history:', err);
    }
  });
}

  loading = false;
  response = "";
  
  profileForm = new FormGroup({
    query: new FormControl('', Validators.required),
  });
  
  
  handleSubmit() {
    let queryString = this.profileForm.value.query || "";
    this.profileForm.get('query')?.setValue('');
    this.send(queryString);
    this.history.push({
        role: "user",
        parts: [{ text: queryString }],
      });
  }

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
      this.apiService.updateHistory(localStorage.getItem("email")!, this.history!).subscribe({
      next: (response) => {
        console.log('History updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating history:', error);
      }
    });
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      },
    });
  }
}
