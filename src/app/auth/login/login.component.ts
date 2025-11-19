import { Component } from '@angular/core';
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
export class LoginComponent {
  error: string | null = null;
  loginForm;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
            window.location.href = '/products';
          },
          error: err => {
            this.error = err.error?.message || 'Login failed';
          }
        });
    }
  }
}
