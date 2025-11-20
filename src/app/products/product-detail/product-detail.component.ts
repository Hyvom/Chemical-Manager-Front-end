import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';
import { AuthService } from '../../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  updateRequest(id: number, request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}`, request, { headers: this.getHeaders() });
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  approveRequest(id: number, remarques?: string): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/approve`, { remarques }, { headers: this.getHeaders() });
  }

  rejectRequest(id: number, remarques?: string): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/reject`, { remarques }, { headers: this.getHeaders() });
  }
}
