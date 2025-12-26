import { Class } from './class.model';
import { User } from './user.model';

export interface Course {
  id: string;
  code: string; // e.g., "CS101"
  name: string;
  description?: string;
  credits: number;
  
  // Department
  department: string;
  departmentCode: string;
  
  // Academic information
  academicYearId: string;
  semesterId?: string;
  semesterNumber: number;
  
  // Class associations
  classIds: string[];
  classes?: Class[]; // Populated from API
  
  // Instructor assignments
  coordinatorId?: string;
  coordinator?: User; // Populated from API
  instructorIds: string[];
  instructors?: User[]; // Populated from API
  
  // Statistics
  studentCount: number;
  quizCount: number;
  averageParticipationRate?: number;
  
  // Status
  isActive: boolean;
  hasPrerequisites: boolean;
  prerequisiteCourseIds?: string[];
  
  // Schedule
  startDate: Date;
  endDate: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface CourseEnrollment {
  courseId: string;
  studentId: string;
  enrollmentDate: Date;
  status: 'enrolled' | 'dropped' | 'completed';
  finalGrade?: string;
  gradePoints?: number;
}