// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { TokenService } from '../services/token';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Get token from token service
  const token = tokenService.getToken();

  // Clone request and add authorization header
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Add API base URL if not already present
  if (!authReq.url.startsWith('http') && !authReq.url.startsWith('/api')) {
    authReq = authReq.clone({
      url: `/api${authReq.url.startsWith('/') ? '' : '/'}${authReq.url}`
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        // Try to refresh token
        const refreshToken = tokenService.getRefreshToken();
        
        if (refreshToken) {
          return authService.refreshToken().pipe(
            switchMap((newTokens: any) => {
              // Retry original request with new token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.token}`
                }
              });
              return next(retryReq);
            }),
            catchError(refreshError => {
              // Refresh failed, logout user
              authService.logout();
              router.navigate(['/auth/login']);
              return throwError(() => refreshError);
            })
          );
        } else {
          // No refresh token, logout user
          authService.logout();
          router.navigate(['/auth/login']);
        }
      }
      
      // Re-throw other errors
      return throwError(() => error);
    })
  );
};