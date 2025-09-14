import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/authservice';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  getUsername(): string | null {
    return this.authService.getCurrentUser();
  }
    isNotAuthenticated(): boolean {
    return !this.authService.isAuthenticated();
  } 
}
