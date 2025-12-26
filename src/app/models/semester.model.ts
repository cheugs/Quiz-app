import { AcademicYear } from './academic-year.model';   


export enum SemesterType {
  FALL = 'fall',
  SPRING = 'spring',
  SUMMER = 'summer',
  WINTER = 'winter'
}

export interface Semester {
  id: string;
  name: string; // e.g., "Fall Semester 2023"
  code: string; // e.g., "S1-2023"
  type: SemesterType;
  number: number; // 1, 2, etc.
  
  // Dates
  startDate: Date;
  endDate: Date;
  registrationStart: Date;
  registrationEnd: Date;
  
  // Academic Year
  academicYearId: string;
  academicYear?: AcademicYear; // Populated from API
  
  // Status
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'completed';
  
  // Evaluation periods
  evaluationPeriods: EvaluationPeriod[];
  
  // Statistics
  enrolledStudents: number;
  activeCourses: number;
  completedQuizzes: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface EvaluationPeriod {
  id: string;
  semesterId: string;
  type: 'mid_term' | 'end_of_semester';
  name: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  isActive: boolean;
  allowedEvaluationTypes: string[];
}