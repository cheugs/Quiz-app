import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationsManagementService, SendNotificationRequest } from './../../core/services/notifications-management';
import { 
  Notification, 
  NotificationTemplate, 
  NotificationType, 
  NotificationStatus, 
  NotificationChannel 
} from '../../models/notification.model';
import { Class } from '../../models/class.model';
import { Course } from '../../models/course.model';
import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';

// Import icon components
import { 
  BellIconComponent, 
  SearchIconComponent, 
  FilterIconComponent,
  ChevronDownIconComponent,
  CalendarIconComponent,
  ClockIconComponent,
  CheckCircleIconComponent,
  XIconComponent,
  RefreshIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  EyeIconComponent,
  TrendingUpIconComponent,
  UsersIconComponent,
  MailIconComponent,
  MessageSquareIconComponent,
  AlertCircleIconComponent,
  MoreIconComponent,
  DownloadIconComponent, 
} from '../../../assets/icon-dashboard';

@Component({
  selector: 'app-notifications-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Icon Components
    BellIconComponent,
    SearchIconComponent,
    FilterIconComponent,
    ChevronDownIconComponent,
    CalendarIconComponent,
    ClockIconComponent,
    CheckCircleIconComponent,
    XIconComponent,
    RefreshIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    EyeIconComponent,
    TrendingUpIconComponent,
    UsersIconComponent,
    MailIconComponent,
    MessageSquareIconComponent,
    AlertCircleIconComponent,
    MoreIconComponent,
    DownloadIconComponent, 
  ],
  templateUrl: './notifications-management.html',
  styleUrls: ['./notifications-management.scss']
})
export class NotificationsManagementComponent implements OnInit {
  private notificationsService = inject(NotificationsManagementService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  // Data signals
  notifications = signal<Notification[]>([]);
  templates = signal<NotificationTemplate[]>([]);
  deliveryStats = signal<any>(null);
  classes = signal<Class[]>([]);
  courses = signal<Course[]>([]);
  
  // UI state signals
  isLoading = signal(true);
  showNewNotificationModal = signal(false);
  showTemplateModal = signal(false);
  selectedTab = signal<'notifications' | 'templates' | 'stats'>('notifications');
  
  // Filter signals
  searchQuery = signal('');
  statusFilter = signal<string>('all');
  typeFilter = signal<string>('all');
  dateRangeFilter = signal<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  // New notification form signals
  newNotification = signal<SendNotificationRequest>({
    title: '',
    message: '',
    type: NotificationType.CUSTOM_MESSAGE,
    recipientType: 'all',
    recipientIds: [],
    sendImmediately: true,
    scheduledTime: new Date(),
    channels: [NotificationChannel.IN_APP],
    actionUrl: '',
    actionText: ''
  });

  // New template form signals
  newTemplate = signal<Partial<NotificationTemplate>>({
    name: '',
    description: '',
    type: NotificationType.CUSTOM_MESSAGE,
    subjectTemplate: '',
    messageTemplate: '',
    variables: [],
    defaultChannels: [NotificationChannel.IN_APP],
    defaultRecipientType: 'all',
    isActive: true
  });

  // Notification type options
  notificationTypes = Object.values(NotificationType);
  
  // Channel options
  channelOptions = [
    { value: NotificationChannel.IN_APP, label: 'In-App', icon: 'bell' },
    { value: NotificationChannel.EMAIL, label: 'Email', icon: 'mail' },
    { value: NotificationChannel.SMS, label: 'SMS', icon: 'message-square' },
    { value: NotificationChannel.PUSH, label: 'Push', icon: 'smartphone' }
  ];

  // Recipient type options
  recipientTypes = [
    { value: 'all', label: 'All Students', icon: 'users' },
    { value: 'class', label: 'Specific Classes', icon: 'school' },
    { value: 'course', label: 'Course Students', icon: 'book-open' },
    { value: 'individual', label: 'Individual Students', icon: 'user' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    
    // Load data from service
    this.notifications.set(this.notificationsService.notifications$());
    this.templates.set(this.notificationsService.templates$());
    this.deliveryStats.set(this.notificationsService.deliveryStats$());
    this.classes.set(this.notificationsService.classes$());
    this.courses.set(this.notificationsService.courses$());

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  refreshData(): void {
    this.notificationsService.refreshData();
    this.loadData();
    this.notificationService.showSuccess('Data refreshed successfully');
  }

  // Filtering methods
  filteredNotifications() {
    return this.notifications().filter(notification => {
      // Search filter
      if (this.searchQuery() && !notification.title.toLowerCase().includes(this.searchQuery().toLowerCase()) &&
          !notification.message.toLowerCase().includes(this.searchQuery().toLowerCase())) {
        return false;
      }

      // Status filter
      if (this.statusFilter() !== 'all' && notification.status !== this.statusFilter()) {
        return false;
      }

      // Type filter
      if (this.typeFilter() !== 'all' && notification.type !== this.typeFilter()) {
        return false;
      }

      // Date range filter
      if (this.dateRangeFilter().start && notification.createdAt < this.dateRangeFilter().start!) {
        return false;
      }
      if (this.dateRangeFilter().end && notification.createdAt > this.dateRangeFilter().end!) {
        return false;
      }

      return true;
    });
  }

  filteredTemplates() {
    return this.templates().filter(template => {
      if (this.searchQuery() && !template.name.toLowerCase().includes(this.searchQuery().toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  // Notification actions
  sendNotification(): void {
    if (!this.validateNotification()) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    const notificationData = this.newNotification();
    if (notificationData.sendImmediately) {
      this.notificationsService.sendNotification(notificationData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Notification sent successfully');
          this.showNewNotificationModal.set(false);
          this.resetNewNotificationForm();
          this.refreshData();
        },
        error: (error) => {
          this.notificationService.showError('Failed to send notification');
        }
      });
    } else {
      this.notificationsService.scheduleNotification(notificationData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Notification scheduled successfully');
          this.showNewNotificationModal.set(false);
          this.resetNewNotificationForm();
          this.refreshData();
        },
        error: (error) => {
          this.notificationService.showError('Failed to schedule notification');
        }
      });
    }
  }

  cancelNotification(notificationId: string): void {
    if (confirm('Are you sure you want to cancel this notification?')) {
      this.notificationsService.cancelNotification(notificationId).subscribe({
        next: () => {
          this.notificationService.showSuccess('Notification cancelled successfully');
          this.refreshData();
        },
        error: (error) => {
          this.notificationService.showError('Failed to cancel notification');
        }
      });
    }
  }

  resendNotification(notificationId: string): void {
    this.notificationsService.resendNotification(notificationId).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Notification resent successfully');
        this.refreshData();
      },
      error: (error) => {
        this.notificationService.showError('Failed to resend notification');
      }
    });
  }

  // Template actions
  createTemplate(): void {
    if (!this.validateTemplate()) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    this.notificationsService.createTemplate(this.newTemplate()).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Template created successfully');
        this.showTemplateModal.set(false);
        this.resetNewTemplateForm();
        this.refreshData();
      },
      error: (error) => {
        this.notificationService.showError('Failed to create template');
      }
    });
  }

  deleteTemplate(templateId: string): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.notificationsService.deleteTemplate(templateId).subscribe({
        next: () => {
          this.notificationService.showSuccess('Template deleted successfully');
          this.refreshData();
        },
        error: (error) => {
          this.notificationService.showError('Failed to delete template');
        }
      });
    }
  }

  useTemplate(template: NotificationTemplate): void {
    this.newNotification.set({
      title: '',
      message: template.messageTemplate,
      type: template.type,
      recipientType: template.defaultRecipientType as any,
      recipientIds: [],
      sendImmediately: true,
      scheduledTime: new Date(),
      channels: template.defaultChannels,
      actionUrl: '',
      actionText: ''
    });
    this.showNewNotificationModal.set(true);
  }

  clearFilters(): void {
  this.searchQuery.set('');
  this.statusFilter.set('all');
  this.typeFilter.set('all');
  this.dateRangeFilter.set({ start: null, end: null });
  this.refreshData();
}

// In your component TypeScript file, update the getStatusColor method:
getStatusColor(status: NotificationStatus): string {
  switch(status) {
    case NotificationStatus.SENT: return '#10b981'; // Green
    case NotificationStatus.SCHEDULED: return '#3b82f6'; // Blue
    case NotificationStatus.SENDING: return '#f59e0b'; // Amber
    case NotificationStatus.FAILED: return '#ef4444'; // Red
    case NotificationStatus.DRAFT: return '#6b7280'; // Gray
    case NotificationStatus.CANCELLED: return '#94a3b8'; // Light gray
    default: return '#6b7280';
  }
}

// Add this method for better status display:
getStatusClass(status: NotificationStatus): string {
  switch(status) {
    case NotificationStatus.SENT: return 'status-sent';
    case NotificationStatus.SCHEDULED: return 'status-scheduled';
    case NotificationStatus.SENDING: return 'status-sending';
    case NotificationStatus.FAILED: return 'status-failed';
    case NotificationStatus.DRAFT: return 'status-draft';
    case NotificationStatus.CANCELLED: return 'status-cancelled';
    default: return 'status-draft';
  }
}

  // Helper methods
  validateNotification(): boolean {
    const notification = this.newNotification();
    return !!notification.title && !!notification.message && 
           !!notification.recipientType && notification.channels.length > 0;
  }

  validateTemplate(): boolean {
    const template = this.newTemplate();
    return !!template.name && !!template.subjectTemplate && !!template.messageTemplate;
  }

  resetNewNotificationForm(): void {
    this.newNotification.set({
      title: '',
      message: '',
      type: NotificationType.CUSTOM_MESSAGE,
      recipientType: 'all',
      recipientIds: [],
      sendImmediately: true,
      scheduledTime: new Date(),
      channels: [NotificationChannel.IN_APP],
      actionUrl: '',
      actionText: ''
    });
  }

  resetNewTemplateForm(): void {
    this.newTemplate.set({
      name: '',
      description: '',
      type: NotificationType.CUSTOM_MESSAGE,
      subjectTemplate: '',
      messageTemplate: '',
      variables: [],
      defaultChannels: [NotificationChannel.IN_APP],
      defaultRecipientType: 'all',
      isActive: true
    });
  }

  // getStatusColor(status: NotificationStatus): string {
  //   return this.notificationsService.getStatusColor(status);
  // }

  getStatusText(status: NotificationStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getTypeIcon(type: NotificationType): string {
    return this.notificationsService.getTypeIcon(type);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  getDeliveryRate(): number {
    const stats = this.deliveryStats();
    if (!stats) return 0;
    return stats.deliveryRate || 0;
  }

  getReadRate(): number {
    const stats = this.deliveryStats();
    if (!stats) return 0;
    return stats.readRate || 0;
  }

  toggleChannel(channel: NotificationChannel): void {
    const currentChannels = [...this.newNotification().channels];
    const index = currentChannels.indexOf(channel);
    
    if (index > -1) {
      currentChannels.splice(index, 1);
    } else {
      currentChannels.push(channel);
    }
    
    this.newNotification.update(n => ({ ...n, channels: currentChannels }));
  }

  toggleClassSelection(classId: string): void {
    const currentIds = [...this.newNotification().recipientIds];
    const index = currentIds.indexOf(classId);
    
    if (index > -1) {
      currentIds.splice(index, 1);
    } else {
      currentIds.push(classId);
    }
    
    this.newNotification.update(n => ({ ...n, recipientIds: currentIds }));
  }

  isClassSelected(classId: string): boolean {
    return this.newNotification().recipientIds.includes(classId);
  }

  // Tab switching
  switchTab(tab: 'notifications' | 'templates' | 'stats'): void {
    this.selectedTab.set(tab);
  }
}