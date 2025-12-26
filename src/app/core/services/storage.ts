// src/app/core/services/storage.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly localStoragePrefix = environment.storage.localStoragePrefix;
  private readonly sessionStoragePrefix = environment.storage.sessionStoragePrefix;

  // ================ LOCAL STORAGE ================

  /**
   * Set item in local storage
   */
  setLocalItem<T>(key: string, value: T): void {
    try {
      const storageKey = this.getLocalStorageKey(key);
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get item from local storage
   */
  getLocalItem<T>(key: string): T | null {
    try {
      const storageKey = this.getLocalStorageKey(key);
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Remove item from local storage
   */
  removeLocalItem(key: string): void {
    const storageKey = this.getLocalStorageKey(key);
    localStorage.removeItem(storageKey);
  }

  /**
   * Clear all app items from local storage
   */
  clearLocalStorage(): void {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.localStoragePrefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Check if local storage item exists
   */
  hasLocalItem(key: string): boolean {
    const storageKey = this.getLocalStorageKey(key);
    return localStorage.getItem(storageKey) !== null;
  }

  // ================ SESSION STORAGE ================

  /**
   * Set item in session storage
   */
  setSessionItem<T>(key: string, value: T): void {
    try {
      const storageKey = this.getSessionStorageKey(key);
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(storageKey, serializedValue);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }

  /**
   * Get item from session storage
   */
  getSessionItem<T>(key: string): T | null {
    try {
      const storageKey = this.getSessionStorageKey(key);
      const item = sessionStorage.getItem(storageKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  }

  /**
   * Remove item from session storage
   */
  removeSessionItem(key: string): void {
    const storageKey = this.getSessionStorageKey(key);
    sessionStorage.removeItem(storageKey);
  }

  /**
   * Clear all app items from session storage
   */
  clearSessionStorage(): void {
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(this.sessionStoragePrefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  /**
   * Check if session storage item exists
   */
  hasSessionItem(key: string): boolean {
    const storageKey = this.getSessionStorageKey(key);
    return sessionStorage.getItem(storageKey) !== null;
  }

  // ================ GENERIC STORAGE ================

  /**
   * Clear all storage (both local and session)
   */
  clearAll(): void {
    this.clearLocalStorage();
    this.clearSessionStorage();
  }

  /**
   * Get storage statistics
   */
  getStorageStats(): { local: number; session: number; total: number } {
    const localKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.localStoragePrefix)
    );
    
    const sessionKeys = Object.keys(sessionStorage).filter(key => 
      key.startsWith(this.sessionStoragePrefix)
    );

    const localSize = localKeys.reduce((total, key) => 
      total + (localStorage.getItem(key)?.length || 0), 0
    );
    
    const sessionSize = sessionKeys.reduce((total, key) => 
      total + (sessionStorage.getItem(key)?.length || 0), 0
    );

    return {
      local: localSize,
      session: sessionSize,
      total: localSize + sessionSize
    };
  }

  // ================ PRIVATE HELPERS ================

  private getLocalStorageKey(key: string): string {
    return `${this.localStoragePrefix}${key}`;
  }

  private getSessionStorageKey(key: string): string {
    return `${this.sessionStoragePrefix}${key}`;
  }

  /**
   * Safely handle storage quota exceeded errors
   */
  private handleStorageError(error: any, operation: string): void {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      console.warn('Storage quota exceeded. Clearing old data...');
      
      // Try to clear some old data
      this.clearOldStorageData();
      
      // Notify user
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('storageQuotaExceeded'));
      }
    }
    
    console.error(`Storage ${operation} failed:`, error);
  }

  /**
   * Clear old storage data based on timestamps
   */
  private clearOldStorageData(): void {
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    // Clear old local storage items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.localStoragePrefix)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const data = JSON.parse(item);
            if (data._timestamp && (now - data._timestamp > maxAge)) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // If we can't parse it, leave it
        }
      }
    });
  }
}