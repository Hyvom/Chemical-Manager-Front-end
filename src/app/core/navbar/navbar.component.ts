import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin(); // Use the new isAdmin() method

    // Debug: log to console to see what's happening
    console.log('Auth Status:', {
      isAuthenticated: this.isAuthenticated,
      isAdmin: this.isAdmin,
      role: this.authService.getRole()
    });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
