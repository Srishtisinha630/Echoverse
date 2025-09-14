import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/authservice';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isAuthEndpoint = req.url.includes('/api/auth');

  if (!isAuthEndpoint && req.url.includes('/api/')) {
    const token = authService.getToken();
    if (token) {
      const setHeaders: Record<string, string> = { Authorization: `Bearer ${token}` };
      if (req.body != null) setHeaders['Content-Type'] = 'application/json'; // <- only when body exists
      return next(req.clone({ setHeaders }));
    }
  }
  return next(req);
};
