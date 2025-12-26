import { Class } from './class.model';

export enum StudentStatus {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended',
  DROPPED = 'dropped'
}

export enum VerificationStatus {
  VERIFIED = 'verified',
  PENDING = 'pending',
  UNVERIFIED = 'unverified'
}

export interface Student {
  id: string;
  studentId: string; // University ID
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  phoneNumber?: string;
  
  // Academic Information
  currentClassId: string;
  currentClass?: Class; // Populated from API
  department: string;
  academicYearId: string;
  enrollmentDate: Date;
  graduationDate?: Date;
  
  // Status
  status: StudentStatus;
  verificationStatus: VerificationStatus;
  isActive: boolean;
  
  // Authentication
  lastLoginAt?: Date;
  passwordResetRequired: boolean;
  
  // Contact Information
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Statistics
  totalQuizzesTaken: number;
  averageScore?: number;
  lastQuizTakenAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentActivity {
  studentId: string;
  quizId: string;
  quizTitle: string;
  completedAt: Date;
  score?: number;
  timeSpent: number; // in minutes
}