import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	Validators,
	ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ApiService } from "../api.service";

@Component({
	selector: "chat-route",
	standalone: true,
	templateUrl: "./chatComponent.html",
	styleUrls: ["./chatComponent.css"],
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatLabel,
		MatButtonModule,
		ReactiveFormsModule,
	],
})
export class ChatComponent {
	history: { role: string; parts: { text: string }[] }[] = [];
	historyDeleted: boolean = false;
	loadingResponse: boolean = false;
	chatForm = new FormGroup({
		query: new FormControl("", Validators.required),
	});

	constructor(private apiService: ApiService) {
		this.apiService.getHistory().subscribe({
			next: (response) => {
				if (response.error) {
					console.error("Error fetching history");
				} else {
					this.history = response.history || [];
				}
			},
		});
	}

	handleSubmit() {
		let message = this.chatForm.value.query || "";
		this.history.push({
			role: "user",
			parts: [{ text: message }],
		});
		this.chatForm.get("query")?.setValue("");
		this.loadingResponse = true;
		this.apiService.sendMessage(message, this.history).subscribe({
			next: (response) => {
				this.history.push({
					role: "model",
					parts: [{ text: response.reply }],
				});
				this.loadingResponse = false;
				this.apiService.updateHistory(this.history).subscribe({
					next: (updateResponse) => {},
				});
			},
		});
	}

	deleteHistory() {
		this.history = [];
		this.historyDeleted = true;
		this.apiService.deleteHistory().subscribe({
			next: (response) => {
				if (response.error) {
					console.error("Error deleting history");
				}
			},
		});
		new Promise((r) => setTimeout(r, 1500)).then(() => {
			this.historyDeleted = false;
		});
	}
}
