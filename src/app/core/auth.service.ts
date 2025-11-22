import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
        })
      );
  }

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

  // Add this method to properly check if user is admin
  isAdmin(): boolean {
    const role = this.getRole();
    if (!role) return false;

    // Check for common admin role formats
    const roleLower = role.toLowerCase();
    return roleLower === 'admin' ||
           roleLower === 'role_admin' ||
           roleLower.includes('admin');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
