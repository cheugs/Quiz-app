import { User, UserRole } from './user.model';
import { Course } from './course.model';
import { Class } from './class.model';

export interface Administrator extends User {
  // Specific admin properties
  adminId: string;
  employeeNumber?: string;
  position: string;
  hireDate: Date;
  
  // Department assignments
  managedDepartments: string[];
  
  // Course assignments
  managedCourseIds: string[];
  managedCourses?: Course[]; // Populated from API
  
  // Class assignments
  managedClassIds: string[];
  managedClasses?: Class[]; // Populated from API
  
  // Permissions
  canCreateQuizzes: boolean;
  canEditQuizzes: boolean;
  canDeleteQuizzes: boolean;
  canViewResponses: boolean;
  canExportData: boolean;
  canManageStudents: boolean;
  canManageQuestions: boolean;
  canSendNotifications: boolean;
  
  // Audit trail
  lastActivityAt?: Date;
  totalActions: number;
}

export interface AdminActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  entityType: string; // 'quiz', 'student', 'question', etc.
  entityId?: string;
  entityName?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}