// src/app/models/notification.model.ts

// Keep as enums for type safety
export enum NotificationType {
  QUIZ_PUBLISHED = 'quiz_published',
  QUIZ_REMINDER = 'quiz_reminder',
  DEADLINE_WARNING = 'deadline_warning',
  SYSTEM_ANNOUNCEMENT = 'system_announcement',
  ACCOUNT_VERIFICATION = 'account_verification',
  PASSWORD_RESET = 'password_reset',
  GRADE_RELEASED = 'grade_released',
  CUSTOM_MESSAGE = 'custom_message'
}

export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push'
}

export enum NotificationStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  
  // Recipients
  recipientType: 'all' | 'class' | 'course' | 'individual';
  recipientIds: string[]; // studentIds or classIds or courseIds
  estimatedRecipientCount: number;
  
  // Scheduling
  sendAt: Date;
  status: NotificationStatus;
  sentAt?: Date;
  
  // Channels
  channels: NotificationChannel[];
  
  // Tracking
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  failureReasons?: string[];
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Template (if from template)
  templateId?: string;
  templateVariables?: Record<string, any>;
  
  // Actions/CTA
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string;
  type: NotificationType;
  
  // Content
  subjectTemplate: string;
  messageTemplate: string;
  variables: string[]; // Available variables for template
  
  // Default settings
  defaultChannels: NotificationChannel[];
  defaultRecipientType: string;
  isActive: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  usageCount: number;
}

export interface UserNotification {
  id: string;
  userId: string;
  notificationId: string;
  notification?: Notification; // Populated from API
  
  // Delivery status
  channel: NotificationChannel;
  status: 'pending' | 'delivered' | 'read' | 'failed';
  deliveredAt?: Date;
  readAt?: Date;
  
  // Device info (for push)
  deviceToken?: string;
  devicePlatform?: string;
  
  // Email info
  emailId?: string;
  emailStatus?: 'sent' | 'opened' | 'clicked' | 'bounced';
  
  createdAt: Date;
}