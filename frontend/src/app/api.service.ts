// api.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	private apiUrl = "http://localhost:3000";

	constructor(private http: HttpClient) {}

	private getAuthHeaders() {
		const token = localStorage.getItem("token");
		return {
			headers: new HttpHeaders({
				Authorization: `${token}`,
			}),
		};
	}

	sendMessage(
		message: string,
		history: { role: string; parts: { text: string }[] }[]
	): Observable<any> {
		return this.http.post(
			`${this.apiUrl}/chat`,
			{ message, history },
			this.getAuthHeaders()
		);
	}

	signup(name: string, email: string, password: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/signup`, {
			name,
			email,
			password,
		});
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/login`, { email, password });
	}

	updateHistory(
		history: { role: string; parts: { text: string }[] }[]
	): Observable<any> {
		return this.http.post(
			`${this.apiUrl}/update-history`,
			{ history },
			this.getAuthHeaders()
		);
	}

	getHistory(): Observable<any> {
		return this.http.post(
			`${this.apiUrl}/get-history`,
			{},
			this.getAuthHeaders()
		);
	}

	getName(email: string): Observable<any> {
		return this.http.post(
			`${this.apiUrl}/get-name`,
			{ email },
			this.getAuthHeaders()
		);
	}

	deleteHistory(): Observable<any> {
		return this.http.post(
			`${this.apiUrl}/delete-history`,
			{},
			this.getAuthHeaders()
		);
	}
}
