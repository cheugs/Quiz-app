import { Semester } from './semester.model';

export interface AcademicYear {
  id: string;
  name: string; // e.g., "2023-2024"
  code: string; // e.g., "AY2324"
  startDate: Date;
  endDate: Date;
  
  // Status
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'completed';
  
  // Statistics
  totalStudents: number;
  totalCourses: number;
  totalClasses: number;
  totalQuizzes: number;
  
  // Semesters
  semesterIds: string[];
  semesters?: Semester[]; // Populated from API
  
  // Default settings
  defaultEvaluationSettings: {
    midTermDuration: number;
    finalExamDuration: number;
    passingScore: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface AcademicYearSummary {
  academicYearId: string;
  academicYearName: string;
  totalEnrollments: number;
  completionRate: number;
  averageStudentPerformance: number;
  topPerformingClass: {
    classId: string;
    className: string;
    averageScore: number;
  };
}