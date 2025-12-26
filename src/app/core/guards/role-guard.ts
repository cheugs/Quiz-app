// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

export const roleGuard: CanActivateFn = (route, state) => {
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

  // Get required roles from route data
  const requiredRoles = route.data?.['roles'] as string[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // No role requirements specified
  }

  // Check if user has required role
  const user = authService.getCurrentUser();
  if (user && requiredRoles.includes(user.role)) {
    return true;
  }

  // User doesn't have required role
  notificationService.showError('Access denied. Insufficient privileges.');
  router.navigate(['/dashboard']);
  return false;
};