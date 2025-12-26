// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  User, 
  LoginResponse, 
  UserRole, 
  RefreshTokenResponse,
  RegisterRequest,
  LoginRequest 
} from '../../models/user.model';
import { TokenService } from './token';
import { NotificationService } from './notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private notificationService = inject(NotificationService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Store the URL for redirecting after login
  public redirectUrl: string | null = null;

  constructor() {
    // Initialize from token service
    const user = this.tokenService.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  /**
   * Login user with email and password
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    
    return this.http.post<LoginResponse>('/api/auth/login', loginRequest).pipe(
      tap(response => {
        // Store tokens and user data
        this.tokenService.setToken(response.token);
        this.tokenService.setRefreshToken(response.refreshToken);
        this.tokenService.setUser(response.user);
        
        // Update current user subject
        this.currentUserSubject.next(response.user);
        
        // Show success notification
        this.notificationService.showSuccess(`Welcome back, ${response.user.firstName}!`);
        
        // Navigate to redirect URL or dashboard
        const redirectTo = this.redirectUrl || '/dashboard';
        this.router.navigate([redirectTo]);
        this.redirectUrl = null;
      }),
      catchError(error => {
        this.notificationService.showError('Login failed. Please check your credentials.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    // Call logout API if needed
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => {
        this.clearAuthData();
      },
      error: () => {
        // Even if API fails, clear local data
        this.clearAuthData();
      }
    });
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshTokenResponse>('/api/auth/refresh', {
      refreshToken
    }).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.tokenService.setRefreshToken(response.refreshToken);
      }),
      catchError(error => {
        // If refresh fails, logout user
        this.clearAuthData();
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  /**
   * Register a new user
   */
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post('/api/auth/register', userData).pipe(
      tap(() => {
        this.notificationService.showSuccess('Registration successful! Please check your email to verify your account.');
      }),
      catchError(error => {
        this.notificationService.showError('Registration failed. Please try again.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Reset password
   */
  resetPassword(email: string): Observable<any> {
    return this.http.post('/api/auth/reset-password', { email }).pipe(
      tap(() => {
        this.notificationService.showSuccess('Password reset instructions sent to your email.');
      }),
      catchError(error => {
        this.notificationService.showError('Failed to send reset instructions.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Verify user account
   */
  verifyAccount(token: string): Observable<any> {
    return this.http.post('/api/auth/verify', { token }).pipe(
      tap(() => {
        this.notificationService.showSuccess('Account verified successfully! You can now login.');
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        this.notificationService.showError('Account verification failed.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Update user profile
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>('/api/auth/profile', userData).pipe(
      tap(updatedUser => {
        // Update stored user data
        this.tokenService.setUser(updatedUser);
        this.currentUserSubject.next(updatedUser);
        
        this.notificationService.showSuccess('Profile updated successfully!');
      }),
      catchError(error => {
        this.notificationService.showError('Failed to update profile.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Change password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post('/api/auth/change-password', {
      currentPassword,
      newPassword
    }).pipe(
      tap(() => {
        this.notificationService.showSuccess('Password changed successfully!');
      }),
      catchError(error => {
        this.notificationService.showError('Failed to change password.');
        return throwError(() => error);
      })
    );
  }

  /**
   * Initialize auth state on app start
   */
  initializeAuthState(): void {
    // Check if token exists and is not expired
    const token = this.tokenService.getToken();
    const user = this.tokenService.getUser();
    
    if (token && user && !this.tokenService.isTokenExpired(token)) {
      this.currentUserSubject.next(user);
    } else if (token && this.tokenService.isTokenExpired(token)) {
      // Token expired, try to refresh
      this.refreshToken().subscribe({
        next: () => {
          const refreshedUser = this.tokenService.getUser();
          if (refreshedUser) {
            this.currentUserSubject.next(refreshedUser);
          }
        },
        error: () => {
          this.clearAuthData();
        }
      });
    }
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    this.tokenService.clear();
    this.currentUserSubject.next(null);
    this.redirectUrl = null;
    this.router.navigate(['/auth/login']);
    this.notificationService.showInfo('You have been logged out.');
  }
}