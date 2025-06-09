// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'any' // 'any' is used to ensure the service is available throughout the app,
})
export class ApiService {
    private apiUrl = 'http://localhost:3000'; // Your Node backend URL

    constructor(private http: HttpClient) { }

    sendMessage(message: string, history: { role: string; parts: { text: string }[] }[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/chat`, { message, history });
    }

    signup(name: string, email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    updateHistory(email: string, history: { role: string; parts: { text: string }[] }[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/save-history`, { email, history });
    } 

    getHistory(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/get-history`, { email });
    } 
}