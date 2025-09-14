import { HttpClient } from '@angular/common/http';
import { AuthLoginRequest } from '../../models/auth/authLoginRequest';
import { AuthLoginResponse } from '../../models/auth/authLoginResponse';
import { AuthRegisterRequest } from '../../models/auth/authRegisterRequest';
import { AuthRegisterResponse } from '../../models/auth/authRegisterResponse';
import { Router } from '@angular/router';
import { API_BASE_AUTH_URL, TOKEN_KEY, USER_KEY } from '../../models/auth/authConstant';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  }

  // Gets the current JWT token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  // Gets the current user's username
  getCurrentUser(): string | null {
    return localStorage.getItem(USER_KEY);
  }

  // User registration
  register(authRegisterRequest: AuthRegisterRequest): Observable<AuthRegisterResponse> {
    return this.httpClient.post<AuthRegisterResponse>(API_BASE_AUTH_URL + '/register', authRegisterRequest);
  }

  // User login
  login(authLoginRequest: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.httpClient.post<AuthLoginResponse>(API_BASE_AUTH_URL + '/login', authLoginRequest).pipe(
      tap((response: AuthLoginResponse) => {
        // Store token and user on successful login
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, authLoginRequest.username);
      })
    );
  }

  // User logout
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/signin']); // Redirect to login page
  }
}
