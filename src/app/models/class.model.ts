import { Course } from './course.model';
import { User } from './user.model';
import { Student } from './student.model';
import { Quiz } from './quiz.model';


export interface Class {
  id: string;
  name: string; // e.g., "L3 Informatique Groupe A"
  code: string; // e.g., "L3-INFO-A"
  level: string; // e.g., "L3", "M1"
  
  // Department
  department: string;
  departmentCode: string;
  
  // Academic year
  academicYearId: string;
  
  // Capacity
  maxStudents: number;
  currentStudentCount: number;
  
  // Schedule
  academicYearStart: Date;
  academicYearEnd: Date;
  
  // Course associations
  courseIds: string[];
  courses?: Course[]; // Populated from API
  
  // Coordinator/Instructor
  coordinatorId?: string;
  coordinator?: User; // Populated from API
  
  // Status
  isActive: boolean;
  isFull: boolean;
  
  // Statistics
  averageQuizParticipation?: number;
  totalQuizzesTaken?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ClassProgress {
  classId: string;
  academicYearId: string;
  totalStudents: number;
  activeStudents: number;
  averageScore: number;
  completionRate: number;
  topPerformingStudents: Student[];
  recentQuizzes: Quiz[];
}