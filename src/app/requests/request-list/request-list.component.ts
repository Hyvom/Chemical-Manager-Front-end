import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../core/request.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-request-list',
  standalone: true,
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  imports: [CommonModule]
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.requestService.getAllRequests().subscribe({
      next: (list) => {
        this.requests = list;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load requests';
        this.loading = false;
      }
    });
  }
}
