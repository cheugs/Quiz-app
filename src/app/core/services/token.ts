// src/app/core/services/token.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = environment.auth.tokenStorageKey;
  private readonly REFRESH_TOKEN_KEY = environment.auth.refreshTokenStorageKey;
  private readonly USER_KEY = environment.auth.userStorageKey;

  /**
   * Get access token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Set access token
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Set refresh token
   */
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Get user data
   */
  getUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    try {
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  /**
   * Set user data
   */
  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear all tokens and user data
   */
  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token?: string | null): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() >= expiry;
    } catch {
      return true;
    }
  }

  /**
   * Get token expiration time
   */
  getTokenExpiration(token?: string | null): Date | null {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  /**
   * Get time until token expires (in milliseconds)
   */
  getTimeUntilExpiry(token?: string | null): number {
    if (!token) return 0;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return expiry - Date.now();
    } catch {
      return 0;
    }
  }
}