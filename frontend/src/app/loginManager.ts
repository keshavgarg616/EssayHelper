import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
		MatInputModule
	],
	templateUrl: './loginManager.html',
})
export class LoginManagerComponent {
	@Output() loginStatusChange = new EventEmitter<boolean>();

	email: string = '';
	isLoggedIn: boolean = false;
	isSignup: boolean = false;
    isInvalidLogin: boolean = false;

	constructor(private apiService: ApiService) {}

	profileForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
	});

	signupForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
	});

	login() {
		if (this.profileForm.valid) {
			const { email, password } = this.profileForm.value;
			if (email && password) {
				this.apiService.login(email, password).subscribe({
					next: (response) => {
						console.log('Login successful:', response);
						this.email = email;
						this.isLoggedIn = true;
						this.loginStatusChange.emit(true);
                        localStorage.setItem('email', email!);
                        this.isInvalidLogin = false;
					},
					error: (err) => {
						console.error('Login failed:', err);
                        this.isInvalidLogin = true;
					}
				});
			}
		} else {
			console.error('Login failed: Invalid form');
		}
	}

	logout() {
		this.isLoggedIn = false;
		this.email = '';
		console.log('User logged out');
		this.loginStatusChange.emit(false);
	}

	toggleSignup() {
		this.isSignup = !this.isSignup;
		console.log(`Switched to ${this.isSignup ? 'signup' : 'login'} mode`);
	}

	signup() {
		if (this.signupForm.valid) {
			const { name, email, password } = this.signupForm.value;
			this.apiService.signup(name!, email!, password!).subscribe({
				next: (signupResponse) => {
					console.log('Signup successful:', signupResponse);
					this.apiService.login(email!, password!).subscribe({
						next: (loginResponse) => {
							console.log('Login successful:', loginResponse);
							this.email = email!;
							this.isLoggedIn = true;
							this.loginStatusChange.emit(true);
                            localStorage.setItem('email', email!);
						},
						error: (loginError) => {
							console.error('Login after signup failed:', loginError);
						}
					});
					this.isSignup = false;
				},
				error: (signupError) => {
					console.error('Signup failed:', signupError);
				}
			});
		} else {
			console.error('Signup failed: All fields are required and must be valid');
		}
	}
}