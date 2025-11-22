// register.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit, OnDestroy {
  error: string | null = null;
  success: string | null = null;
  registerForm;
  currentSlide: number = 0;
  private slideInterval: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      role: ['user', Validators.required] // default to 'user', can be changed to 'admin'
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
  if (this.registerForm.valid) {
    this.error = null;
    this.success = null;

    const userData = {
      username: this.registerForm.value.username ?? '',
      password: this.registerForm.value.password ?? '',
      email: this.registerForm.value.email ?? '',
      nom: this.registerForm.value.nom ?? '',
      prenom: this.registerForm.value.prenom ?? '',
      tel: this.registerForm.value.tel ?? ''
    };

    const role = this.registerForm.value.role ?? 'user'; // FIX: Default to 'user' if null/undefined

    this.authService.register(userData, role)
      .subscribe({
        next: () => {
          this.success = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: err => {
          this.error = err.error || 'Registration failed. Please try again.';
        }
      });
  }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
