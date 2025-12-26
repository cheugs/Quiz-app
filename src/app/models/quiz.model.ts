// src/app/models/quiz.model.ts
import { Course } from './course.model';
import { Class } from './class.model';

// Keep as enum for type safety
export enum QuizStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  CLOSED = 'closed',
  ARCHIVED = 'archived'
}

// Keep as enum for type safety
export enum EvaluationType {
  MID_TERM = 'mid_term',
  END_OF_SEMESTER = 'end_of_semester',
  PRACTICE = 'practice',
  ASSIGNMENT = 'assignment',
  FINAL_EXAM = 'final_exam'
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  code: string; // Unique quiz code
  instructions?: string;
  
  // Settings
  duration: number; // in minutes
  passingScore?: number;
  maxAttempts: number;
  showResults: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowReview: boolean;
  
  // Timing
  startDate: Date;
  endDate: Date;
  publishDate?: Date;
  
  // Status
  status: QuizStatus;
  evaluationType: EvaluationType;
  isPublished: boolean;
  
  // Relationships
  courseId: string;
  course?: Course; // Populated from API
  academicYearId: string;
  semesterId?: string;
  createdBy: string; // Admin ID
  createdAt: Date;
  updatedAt: Date;
  
  // Class access
  accessibleClassIds: string[];
  accessibleClasses?: Class[]; // Populated from API
  
  // Question management
  questionIds: string[];
  totalQuestions: number;
  totalPoints: number;
  
  // Statistics
  totalAttempts: number;
  averageScore?: number;
  completionRate?: number;
  participationRate?: number;
}

export interface QuizSchedule {
  id: string;
  quizId: string;
  classId: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  status: 'pending' | 'active' | 'completed';
  notificationSent: boolean;
}