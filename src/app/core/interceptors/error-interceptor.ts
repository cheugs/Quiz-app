// src/app/core/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';
      let showNotification = true;

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 400:
            errorMessage = error.error?.message || 'Bad request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Session expired. Please login again.';
            showNotification = false; // Auth interceptor handles this
            break;
          case 403:
            errorMessage = 'Access denied. You don\'t have permission.';
            router.navigate(['/dashboard']);
            break;
          case 404:
            errorMessage = error.error?.message || 'Resource not found.';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflict. The resource already exists.';
            break;
          case 422:
            errorMessage = error.error?.message || 'Validation failed.';
            // Handle validation errors
            if (error.error?.errors) {
              const validationErrors = Object.values(error.error.errors).flat();
              errorMessage = validationErrors.join(', ');
            }
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service unavailable. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
        }
      }

      // Show notification for non-auth errors
      if (showNotification && error.status !== 401) {
        notificationService.showError(errorMessage);
      }

      console.error('HTTP Error:', error);

      // Re-throw the error for further handling
      return throwError(() => error);
    })
  );
};