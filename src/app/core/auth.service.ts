import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // Match your backend endpoint

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(this.apiUrl, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
        })
      );
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
