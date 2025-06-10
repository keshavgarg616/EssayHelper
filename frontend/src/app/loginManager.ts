import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './api.service';

@Component({
  selector: 'app-login-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './loginManager.html',
})
export class LoginManagerComponent {
  @Output() loginStatusChange = new EventEmitter<boolean>();
  email = '';
  name = '';
  isLoggedIn = false;
  isSignup = false;
  isInvalidLogin = false;
  signupError = '';

  profileForm: FormGroup;
  signupForm: FormGroup;

  constructor(private apiService: ApiService) {
    // Initialize forms
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    // Check for existing login
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.setLoginState(storedEmail);
      this.getName();
    }
  }

  login() {
    if (this.profileForm.valid) {
      const { email, password } = this.profileForm.value as {
        email: string;
        password: string;
      };
      if (email && password) {
        this.apiService.login(email, password).subscribe({
          next: () => {
            this.setLoginState(email);
            this.isInvalidLogin = false;
            this.getName();
          },
          error: () => {
            this.isInvalidLogin = true;
          },
        });
      }
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.name = '';
    localStorage.removeItem('email');
    this.loginStatusChange.emit(false);
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
    this.signupError = '';
    this.isInvalidLogin = false;
  }

  signup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value as {
        name: string;
        email: string;
        password: string;
      };
      this.apiService.signup(name, email, password).subscribe({
        next: () => {
          this.apiService.login(email, password).subscribe({
            next: () => {
              this.setLoginState(email);
              this.getName();
            },
            error: () => {
              this.signupError =
                'Signup succeeded but login failed. Please try logging in.';
            },
          });
          this.isSignup = false;
        },
        error: (err) => {
          this.signupError =
            err?.error?.message || 'Signup failed. Please try again.';
        },
      });
    } else {
      this.signupError = 'All fields are required and must be valid.';
    }
  }

  getName() {
    this.apiService.getName(this.email).subscribe({
      next: (nameResponse: { name: string }) => {
        this.name = nameResponse.name;
      },
    });
  }

  private setLoginState(email: string) {
    this.email = email;
    this.isLoggedIn = true;
    localStorage.setItem('email', email);
    this.loginStatusChange.emit(true);
    this.isInvalidLogin = false;
  }
}
