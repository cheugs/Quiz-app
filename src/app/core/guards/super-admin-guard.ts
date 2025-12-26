// src/app/core/guards/super-admin.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  // First check if user is authenticated
  if (!authService.isAuthenticated()) {
    authService.redirectUrl = state.url;
    notificationService.showError('Please login to access this page');
    router.navigate(['/auth/login']);
    return false;
  }

  // Check if user is super admin
  const user = authService.getCurrentUser();
  if (user && user.role === 'super_admin') {
    return true;
  }

  // User doesn't have required role
  notificationService.showError('Access denied. Super admin privileges required.');
  router.navigate(['/dashboard']);
  return false;
};