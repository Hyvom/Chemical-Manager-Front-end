import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Changed to baseUrl

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { username: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
        })
      );
  }

  // Register method
  register(userData: any, role: string): Observable<any> {
    const endpoint = role === 'admin'
      ? `${this.baseUrl}/register/admin`
      : `${this.baseUrl}/register/user`;
    return this.http.post<any>(endpoint, userData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
