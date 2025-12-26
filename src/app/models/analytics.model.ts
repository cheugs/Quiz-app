export interface DashboardStats {
  // Student stats
  totalStudents: number;
  activeStudents: number;
  newStudentsThisMonth: number;
  studentGrowthRate: number;
  
  // Quiz stats
  totalQuizzes: number;
  activeQuizzes: number;
  quizzesThisMonth: number;
  quizCompletionRate: number;
  
  // Response stats
  totalResponses: number;
  responsesThisMonth: number;
  averageResponseTime: number; // in minutes
  submissionRate: number;
  
  // Course stats
  totalCourses: number;
  activeCourses: number;
  averageCourseParticipation: number;
  
  // System health
  systemUptime: number; // percentage
  activeSessions: number;
  storageUsage: number; // percentage
  lastBackup?: Date;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }>;
}

export interface ParticipationTrend {
  period: string; // 'day', 'week', 'month'
  data: Array<{
    date: string;
    quizzesTaken: number;
    studentsParticipated: number;
    participationRate: number;
  }>;
}

export interface CoursePerformance {
  courseId: string;
  courseName: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  participationRate: number;
  topScorer?: {
    studentId: string;
    studentName: string;
    score: number;
  };
}

export interface ClassPerformance {
  classId: string;
  className: string;
  department: string;
  totalStudents: number;
  averageScore: number;
  quizCompletionRate: number;
  rank: number;
  improvement: number; // percentage change from last period
}

export interface TimeSeriesDataPoint {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface AnalyticsFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  academicYearId?: string;
  semesterId?: string;
  courseIds?: string[];
  classIds?: string[];
  granularity: 'day' | 'week' | 'month';
}