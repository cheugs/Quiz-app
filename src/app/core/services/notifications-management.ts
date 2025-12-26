import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { 
  Notification, 
  NotificationTemplate, 
  UserNotification,
  NotificationType,
  NotificationStatus,
  NotificationChannel 
} from '../../models/notification.model';
import { Class } from '../../models/class.model';
import { Course } from '../../models/course.model';

export interface SendNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  recipientType: 'all' | 'class' | 'course' | 'individual';
  recipientIds: string[];
  sendImmediately: boolean;
  scheduledTime?: Date;
  channels: NotificationChannel[];
  actionUrl?: string;
  actionText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsManagementService {
  private apiUrl = '/api/notifications';
  
  // Signals for reactive state
  private notifications = signal<Notification[]>([]);
  private templates = signal<NotificationTemplate[]>([]);
  private deliveryStats = signal<any>(null);
  private classes = signal<Class[]>([]);
  private courses = signal<Course[]>([]);
  
  // Public readonly signals
  readonly notifications$ = this.notifications.asReadonly();
  readonly templates$ = this.templates.asReadonly();
  readonly deliveryStats$ = this.deliveryStats.asReadonly();
  readonly classes$ = this.classes.asReadonly();
  readonly courses$ = this.courses.asReadonly();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  /**
   * Load all initial data
   */
  loadInitialData(): void {
    this.loadNotifications();
    this.loadTemplates();
    this.loadDeliveryStats();
    this.loadClasses();
    this.loadCourses();
  }

  /**
   * Load notifications
   */
  loadNotifications(): void {
    // Mock data - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Quiz Published',
        message: 'Mid-term evaluation for CS101 has been published',
        type: NotificationType.QUIZ_PUBLISHED,
        recipientType: 'class',
        recipientIds: ['1', '2'],
        estimatedRecipientCount: 87,
        sendAt: new Date('2024-03-10T10:00:00'),
        status: NotificationStatus.SENT,
        sentAt: new Date('2024-03-10T10:00:00'),
        channels: [NotificationChannel.IN_APP],
        deliveredCount: 87,
        readCount: 65,
        failedCount: 0,
        createdBy: 'admin1',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10')
      },
      {
        id: '2',
        title: 'Reminder: Quiz Deadline',
        message: 'Reminder: Math practice quiz deadline is approaching',
        type: NotificationType.QUIZ_REMINDER,
        recipientType: 'class',
        recipientIds: ['3'],
        estimatedRecipientCount: 38,
        sendAt: new Date('2024-03-15T14:00:00'),
        status: NotificationStatus.SCHEDULED,
        channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        deliveredCount: 0,
        readCount: 0,
        failedCount: 0,
        createdBy: 'admin1',
        createdAt: new Date('2024-03-14'),
        updatedAt: new Date('2024-03-14')
      },
      {
        id: '3',
        title: 'System Maintenance',
        message: 'The system will undergo maintenance this weekend',
        type: NotificationType.SYSTEM_ANNOUNCEMENT,
        recipientType: 'all',
        recipientIds: [],
        estimatedRecipientCount: 2456,
        sendAt: new Date('2024-03-12T08:00:00'),
        status: NotificationStatus.SENDING,
        channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        deliveredCount: 1567,
        readCount: 892,
        failedCount: 45,
        createdBy: 'admin1',
        createdAt: new Date('2024-03-11'),
        updatedAt: new Date('2024-03-11')
      },
      {
        id: '4',
        title: 'Account Verification Required',
        message: 'Please verify your account to access all features',
        type: NotificationType.ACCOUNT_VERIFICATION,
        recipientType: 'individual',
        recipientIds: ['student123'],
        estimatedRecipientCount: 1,
        sendAt: new Date('2024-03-09T15:30:00'),
        status: NotificationStatus.FAILED,
        sentAt: new Date('2024-03-09T15:30:00'),
        channels: [NotificationChannel.EMAIL],
        deliveredCount: 0,
        readCount: 0,
        failedCount: 1,
        failureReasons: ['Invalid email address'],
        createdBy: 'admin1',
        createdAt: new Date('2024-03-09'),
        updatedAt: new Date('2024-03-09')
      }
    ];
    
    this.notifications.set(mockNotifications);
  }

  /**
   * Load notification templates
   */
  loadTemplates(): void {
    const mockTemplates: NotificationTemplate[] = [
      {
        id: '1',
        name: 'Quiz Published',
        description: 'Template for quiz publication notifications',
        type: NotificationType.QUIZ_PUBLISHED,
        subjectTemplate: 'New Quiz: {{quizTitle}}',
        messageTemplate: 'A new quiz "{{quizTitle}}" has been published for {{courseName}}. Please complete it by {{deadline}}.',
        variables: ['quizTitle', 'courseName', 'deadline'],
        defaultChannels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        defaultRecipientType: 'class',
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        createdBy: 'admin1',
        usageCount: 24
      },
      {
        id: '2',
        name: 'Deadline Reminder',
        description: 'Template for quiz deadline reminders',
        type: NotificationType.QUIZ_REMINDER,
        subjectTemplate: 'Reminder: {{quizTitle}} Deadline',
        messageTemplate: 'Reminder: The quiz "{{quizTitle}}" deadline is {{deadline}}. Please complete it before the deadline.',
        variables: ['quizTitle', 'deadline'],
        defaultChannels: [NotificationChannel.IN_APP],
        defaultRecipientType: 'class',
        isActive: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        createdBy: 'admin1',
        usageCount: 18
      },
      {
        id: '3',
        name: 'System Announcement',
        description: 'Template for system-wide announcements',
        type: NotificationType.SYSTEM_ANNOUNCEMENT,
        subjectTemplate: 'System Update: {{updateType}}',
        messageTemplate: '{{announcementMessage}}. The system will be {{availability}} during this period.',
        variables: ['updateType', 'announcementMessage', 'availability'],
        defaultChannels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        defaultRecipientType: 'all',
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        createdBy: 'admin1',
        usageCount: 5
      }
    ];
    
    this.templates.set(mockTemplates);
  }

  /**
   * Load delivery statistics
   */
  loadDeliveryStats(): void {
    const mockStats = {
      totalSent: 156,
      totalRead: 892,
      totalFailed: 12,
      deliveryRate: 98.5,
      readRate: 57.8,
      topNotificationTypes: [
        { type: 'quiz_published', count: 45 },
        { type: 'quiz_reminder', count: 38 },
        { type: 'system_announcement', count: 25 }
      ],
      channelDistribution: {
        in_app: 145,
        email: 89,
        sms: 12
      }
    };
    
    this.deliveryStats.set(mockStats);
  }

  /**
   * Load classes for recipient selection
   */
  loadClasses(): void {
    const mockClasses: Class[] = [
      {
        id: '1',
        name: 'L3 Info A',
        code: 'L3-INFO-A',
        level: 'L3',
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        maxStudents: 45,
        currentStudentCount: 42,
        academicYearStart: new Date('2024-09-01'),
        academicYearEnd: new Date('2025-06-30'),
        courseIds: ['1', '2'],
        isActive: true,
        isFull: false,
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-01'),
        createdBy: 'admin1'
      },
      {
        id: '2',
        name: 'L3 Info B',
        code: 'L3-INFO-B',
        level: 'L3',
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        maxStudents: 45,
        currentStudentCount: 45,
        academicYearStart: new Date('2024-09-01'),
        academicYearEnd: new Date('2025-06-30'),
        courseIds: ['1', '3'],
        isActive: true,
        isFull: true,
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-01'),
        createdBy: 'admin1'
      }
    ];
    
    this.classes.set(mockClasses);
  }

  /**
   * Load courses for recipient selection
   */
// In notifications-management.service.ts
// Update the loadCourses() method:

loadCourses(): void {
  const mockCourses: Course[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Computer Science 101',
      credits: 3,
      department: 'Computer Science',
      departmentCode: 'CS',
      academicYearId: '2024',
      semesterNumber: 1,
      classIds: ['1', '2'],
      // Add missing instructorIds
      instructorIds: ['instructor1', 'instructor2'],
      // Optional properties can be omitted or set to empty arrays
      coordinatorId: 'coordinator1',
      studentCount: 87,
      quizCount: 12,
      averageParticipationRate: 78.5,
      isActive: true,
      hasPrerequisites: false,
      prerequisiteCourseIds: [],
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-01-15'),
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01'),
      createdBy: 'admin1'
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Mathematics 201',
      credits: 4,
      department: 'Mathematics',
      departmentCode: 'MATH',
      academicYearId: '2024',
      semesterNumber: 1,
      classIds: ['1'],
      // Add missing instructorIds
      instructorIds: ['instructor3'],
      coordinatorId: 'coordinator2',
      studentCount: 45,
      quizCount: 8,
      averageParticipationRate: 82.3,
      isActive: true,
      hasPrerequisites: true,
      prerequisiteCourseIds: ['1'], // CS101 is a prerequisite
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-01-15'),
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01'),
      createdBy: 'admin1'
    }
  ];
  
  this.courses.set(mockCourses);
}

  /**
   * Send a new notification
   */
  sendNotification(data: SendNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Failed to send notification:', error);
        return of(null as any);
      })
    );
  }

  /**
   * Schedule a notification
   */
  scheduleNotification(data: SendNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/schedule`, data).pipe(
      catchError(error => {
        console.error('Failed to schedule notification:', error);
        return of(null as any);
      })
    );
  }

  /**
   * Cancel a scheduled notification
   */
  cancelNotification(notificationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${notificationId}/cancel`, {}).pipe(
      catchError(error => {
        console.error('Failed to cancel notification:', error);
        return of(null);
      })
    );
  }

  /**
   * Resend a failed notification
   */
  resendNotification(notificationId: string): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/${notificationId}/resend`, {}).pipe(
      catchError(error => {
        console.error('Failed to resend notification:', error);
        return of(null as any);
      })
    );
  }

  /**
   * Create a new template
   */
  createTemplate(template: Partial<NotificationTemplate>): Observable<NotificationTemplate> {
    return this.http.post<NotificationTemplate>(`${this.apiUrl}/templates`, template).pipe(
      catchError(error => {
        console.error('Failed to create template:', error);
        return of(null as any);
      })
    );
  }

  /**
   * Update a template
   */
  updateTemplate(templateId: string, updates: Partial<NotificationTemplate>): Observable<NotificationTemplate> {
    return this.http.put<NotificationTemplate>(`${this.apiUrl}/templates/${templateId}`, updates).pipe(
      catchError(error => {
        console.error('Failed to update template:', error);
        return of(null as any);
      })
    );
  }

  /**
   * Delete a template
   */
  deleteTemplate(templateId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/templates/${templateId}`).pipe(
      catchError(error => {
        console.error('Failed to delete template:', error);
        return of(null);
      })
    );
  }

  /**
   * Get notification delivery details
   */
  getNotificationDetails(notificationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${notificationId}/details`).pipe(
      catchError(error => {
        console.error('Failed to get notification details:', error);
        return of(null);
      })
    );
  }

  /**
   * Refresh all data
   */
  refreshData(): void {
    this.loadInitialData();
  }

  /**
   * Get status color for notifications
   */
  getStatusColor(status: NotificationStatus): string {
    switch(status) {
      case NotificationStatus.SENT: return '#10b981';
      case NotificationStatus.SCHEDULED: return '#3b82f6';
      case NotificationStatus.SENDING: return '#f59e0b';
      case NotificationStatus.FAILED: return '#ef4444';
      case NotificationStatus.DRAFT: return '#6b7280';
      case NotificationStatus.CANCELLED: return '#94a3b8';
      default: return '#6b7280';
    }
  }

  /**
   * Get type icon for notifications
   */
  getTypeIcon(type: NotificationType): string {
    switch(type) {
      case NotificationType.QUIZ_PUBLISHED: return 'quiz';
      case NotificationType.QUIZ_REMINDER: return 'clock';
      case NotificationType.DEADLINE_WARNING: return 'alert-circle';
      case NotificationType.SYSTEM_ANNOUNCEMENT: return 'megaphone';
      case NotificationType.ACCOUNT_VERIFICATION: return 'shield-check';
      case NotificationType.PASSWORD_RESET: return 'key';
      case NotificationType.GRADE_RELEASED: return 'award';
      case NotificationType.CUSTOM_MESSAGE: return 'message-square';
      default: return 'bell';
    }
  }
}