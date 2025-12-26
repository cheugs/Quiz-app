// src/app/core/services/notification.service.ts
import { Injectable, signal, computed } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  private loading = signal(false);

  // Public readonly signals
  public readonly notifications$ = computed(() => this.notifications());
  public readonly loading$ = computed(() => this.loading());
  public readonly hasNotifications$ = computed(() => this.notifications().length > 0);

  /**
   * Show a notification
   */
  showNotification(message: string, type: NotificationType, duration: number = 5000): void {
    const id = Date.now();
    const notification: Notification = {
      id,
      message,
      type,
      duration,
      timestamp: new Date()
    };

    // Add notification
    this.notifications.update(notifications => [...notifications, notification]);

    // Auto-remove if duration is set
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  /**
   * Show success notification
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.showNotification(message, 'success', duration);
  }

  /**
   * Show error notification
   */
  showError(message: string, duration: number = 5000): void {
    this.showNotification(message, 'error', duration);
  }

  /**
   * Show warning notification
   */
  showWarning(message: string, duration: number = 4000): void {
    this.showNotification(message, 'warning', duration);
  }

  /**
   * Show info notification
   */
  showInfo(message: string, duration: number = 4000): void {
    this.showNotification(message, 'info', duration);
  }

  /**
   * Remove a notification by ID
   */
  removeNotification(id: number): void {
    this.notifications.update(notifications => 
      notifications.filter(notification => notification.id !== id)
    );
  }

  /**
   * Clear all notifications
   */
  clearNotifications(): void {
    this.notifications.set([]);
  }

  /**
   * Clear notifications of specific type
   */
  clearNotificationsByType(type: NotificationType): void {
    this.notifications.update(notifications => 
      notifications.filter(notification => notification.type !== type)
    );
  }

  /**
   * Show loading indicator
   */
  showLoading(): void {
    this.loading.set(true);
  }

  /**
   * Hide loading indicator
   */
  hideLoading(): void {
    this.loading.set(false);
  }

  /**
   * Get notification count by type
   */
  getNotificationCount(type?: NotificationType): number {
    const notifications = this.notifications();
    if (!type) return notifications.length;
    
    return notifications.filter(n => n.type === type).length;
  }

  /**
   * Get latest notification
   */
  getLatestNotification(): Notification | null {
    const notifications = this.notifications();
    if (notifications.length === 0) return null;
    
    return notifications[notifications.length - 1];
  }
}