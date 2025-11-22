// login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string | null = null;
  loginForm;
  currentSlide: number = 0;
  private slideInterval: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Start the automatic slideshow
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideshow(): void {
    // Change slide every 5 seconds
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 4; // 4 slides total
    }, 5000);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username ?? '',
        password: this.loginForm.value.password ?? ''
      };
      this.authService.login(credentials)
        .subscribe({
          next: () => {
            window.location.href = '/home';
          },
          error: err => {
            this.error = err.error?.message || 'Login failed';
          }
        });
    }
  }
}
