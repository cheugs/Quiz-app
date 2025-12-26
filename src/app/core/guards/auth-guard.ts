// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Store the attempted URL for redirecting
  authService.redirectUrl = state.url;
  
  // Show notification
  notificationService.showError('Please login to access this page');
  
  // Redirect to login page
  router.navigate(['/auth/login']);
  return false;
};