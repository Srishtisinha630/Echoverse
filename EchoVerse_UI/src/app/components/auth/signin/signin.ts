import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthLoginRequest } from '../../../models/auth/authLoginRequest';
import { AuthService } from '../../../services/auth/authservice';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class SigninComponent {
   signinModel: AuthLoginRequest = {
    username: '',
    password: ''
  };

  registerModel = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  // State management with simple properties
  signinLoading: boolean = false;
  registerLoading: boolean = false;
  signinError: string = '';
  registerError: string = '';
  signinSuccess: string = '';
  registerSuccess: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Sign in method
  onSignin() {
    // Basic validation check
    if (this.isSigninValid()) {
      this.signinLoading = true;
      this.signinError = '';
      this.signinSuccess = '';

      this.authService.login(this.signinModel).pipe(
        finalize(() => {
          // This will always run, whether success or error
          this.signinLoading = false;
        })
      ).subscribe({
        next: (response) => {
          this.signinSuccess = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/music']);
          }, 1000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          
          // Clear any existing success message
          this.signinSuccess = '';
          
          // Extract error message from different possible structures
          if (error.error && error.error.message) {
            this.signinError = error.error.message;
          } else if (error.error && typeof error.error === 'string') {
            this.signinError = error.error;
          } else if (error.message) {
            this.signinError = 'Something went wrong. Please try again!';
          } else {
            this.signinError = 'Login failed. Please check your credentials.';
          }
        }
      });
    }
  }

  // Register method
  onRegister() {
    if (this.isRegisterValid()) {
      this.registerLoading = true;
      this.registerError = '';
      this.registerSuccess = '';

      const { username, password } = this.registerModel;

      this.authService.register({ username, password }).pipe(
        finalize(() => {
          // This will always run, whether success or error
          this.registerLoading = false;
        })
      ).subscribe({
        next: (response) => {
          this.registerSuccess = 'Registration successful! You can now sign in.';
          // Switch to signin tab
          setTimeout(() => {
            const signinTab = document.getElementById('signin-tab') as HTMLElement;
            signinTab?.click();
          }, 1500);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          
          // Clear any existing success message
          this.registerSuccess = '';
          
          // Extract error message from different possible structures
          if (error.error && error.error.message) {
            this.registerError = error.error.message;
          } else if (error.error && typeof error.error === 'string') {
            this.registerError = error.error;
          } else if (error.message) {
            this.registerError = error.message;
          } else {
            this.registerError = 'Registration failed. Please try again.';
          }
        }
      });
    }
  }

  // Validation methods for template-driven forms
  isSigninValid(): boolean {
    return this.signinModel.username.length >= 3 && 
           this.signinModel.password.length >= 6;
  }

  isRegisterValid(): boolean {
    return this.registerModel.username.length >= 3 && 
           this.registerModel.password.length >= 6 &&
           this.registerModel.confirmPassword === this.registerModel.password;
  }

  // Password match validation
  passwordsMatch(): boolean {
    return this.registerModel.password === this.registerModel.confirmPassword;
  }

  // Reset form methods
  resetSigninForm() {
    this.signinModel = {
      username: '',
      password: ''
    };
  }

  resetRegisterForm() {
    this.registerModel = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  // Field validation helpers for template
  isUsernameInvalid(model: any): boolean {
    return model.username && model.username.length < 3;
  }

  isPasswordInvalid(model: any): boolean {
    return model.password && model.password.length < 6;
  }

  isConfirmPasswordInvalid(): boolean {
    return this.registerModel.confirmPassword.length > 0 && 
           this.registerModel.confirmPassword !== this.registerModel.password;
  }

  // Tab switching methods
  switchToRegister() {
    const registerTab = document.getElementById('register-tab') as HTMLElement;
    const registerPane = document.getElementById('register') as HTMLElement;
    const signinTab = document.getElementById('signin-tab') as HTMLElement;
    const signinPane = document.getElementById('signin') as HTMLElement;
    
    if (registerTab && registerPane && signinTab && signinPane) {
      // Update tab classes
      registerTab.classList.add('active');
      signinTab.classList.remove('active');
      
      // Update pane classes
      registerPane.classList.add('show', 'active');
      signinPane.classList.remove('show', 'active');
      
      // Update aria attributes
      registerTab.setAttribute('aria-selected', 'true');
      signinTab.setAttribute('aria-selected', 'false');
    }
  }

  switchToSignin() {
    const registerTab = document.getElementById('register-tab') as HTMLElement;
    const registerPane = document.getElementById('register') as HTMLElement;
    const signinTab = document.getElementById('signin-tab') as HTMLElement;
    const signinPane = document.getElementById('signin') as HTMLElement;
    
    if (registerTab && registerPane && signinTab && signinPane) {
      // Update tab classes
      signinTab.classList.add('active');
      registerTab.classList.remove('active');
      
      // Update pane classes
      signinPane.classList.add('show', 'active');
      registerPane.classList.remove('show', 'active');
      
      // Update aria attributes
      signinTab.setAttribute('aria-selected', 'true');
      registerTab.setAttribute('aria-selected', 'false');
    }
  }

  isRegisterTabActive(): boolean {
    const registerTab = document.getElementById('register-tab');
    return registerTab?.classList.contains('active') || false;
  }
}
