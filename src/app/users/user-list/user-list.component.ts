import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load users';
        this.loading = false;
      }
    });
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe({
      next: () => this.loadUsers(),
      error: (err) => this.error = err.error?.message || 'Failed to add user'
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user.id, user).subscribe({
      next: () => this.loadUsers(),
      error: (err) => this.error = err.error?.message || 'Failed to update user'
    });
  }

  deleteUser(user: User) {
    if (confirm(`Delete user ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => this.error = err.error?.message || 'Failed to delete user'
      });
    }
  }

  enableUser(user: User) {
    this.userService.enableUser(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => this.error = err.error?.message || 'Failed to enable user'
    });
  }

  disableUser(user: User) {
    this.userService.disableUser(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => this.error = err.error?.message || 'Failed to disable user'
    });
  }
}
