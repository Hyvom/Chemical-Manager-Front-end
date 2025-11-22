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
  processingIds: number[] = []; // Track which requests are being processed

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.error = null;

    this.requestService.getAllRequests().subscribe({
      next: (list) => {
        this.requests = list;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load requests';
        this.loading = false;
        console.error('Error loading requests:', err);
      }
    });
  }

  // ✅ APPROVE REQUEST
  approveRequest(requestId: number): void {
    if (!requestId) {
      console.error('Request ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to APPROVE this request?')) {
      this.processingIds.push(requestId);

      this.requestService.approveRequest(requestId).subscribe({
        next: (updatedRequest) => {
          // Update the request in the list
          const index = this.requests.findIndex(r => r.id === requestId);
          if (index !== -1) {
            this.requests[index] = updatedRequest;
          }

          // Remove from processing
          this.processingIds = this.processingIds.filter(id => id !== requestId);

          alert('Request approved successfully!');
        },
        error: (err) => {
          this.processingIds = this.processingIds.filter(id => id !== requestId);
          alert('Failed to approve request: ' + (err.error?.message || err.message));
          console.error('Error approving request:', err);
        }
      });
    }
  }

  // ✅ REJECT REQUEST
  rejectRequest(requestId: number): void {
    if (!requestId) {
      console.error('Request ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to REJECT this request?')) {
      this.processingIds.push(requestId);

      this.requestService.rejectRequest(requestId).subscribe({
        next: (updatedRequest) => {
          // Update the request in the list
          const index = this.requests.findIndex(r => r.id === requestId);
          if (index !== -1) {
            this.requests[index] = updatedRequest;
          }

          // Remove from processing
          this.processingIds = this.processingIds.filter(id => id !== requestId);

          alert('Request rejected successfully!');
        },
        error: (err) => {
          this.processingIds = this.processingIds.filter(id => id !== requestId);
          alert('Failed to reject request: ' + (err.error?.message || err.message));
          console.error('Error rejecting request:', err);
        }
      });
    }
  }
}
