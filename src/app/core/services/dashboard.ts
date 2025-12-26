// src/app/features/dashboard/dashboard.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { 
  DashboardStats, 
  ParticipationTrend, 
  CoursePerformance, 
  ClassPerformance,
  ChartData,
  AnalyticsFilter
} from '../../models/analytics.model';
import { Quiz, QuizStatus, EvaluationType } from '../../models/quiz.model';
import { Notification, NotificationType, NotificationStatus, NotificationChannel } from '../../models/notification.model';
import { Student, StudentStatus, VerificationStatus } from '../../models/student.model'; // Add VerificationStatus here
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = '/api/dashboard';

  // Signals for reactive state management
  private stats = signal<DashboardStats | null>(null);
  private participationTrend = signal<ParticipationTrend | null>(null);
  private coursePerformance = signal<CoursePerformance[]>([]);
  private classPerformance = signal<ClassPerformance[]>([]);
  private recentQuizzes = signal<Quiz[]>([]);
  private recentNotifications = signal<Notification[]>([]);
  private recentStudents = signal<Student[]>([]);
  private upcomingQuizzes = signal<Quiz[]>([]);
  private isLoading = signal<boolean>(false);
  private lastUpdated = signal<Date | null>(null);

  // Public readonly computed signals
  public readonly stats$ = computed(() => this.stats());
  public readonly participationTrend$ = computed(() => this.participationTrend());
  public readonly coursePerformance$ = computed(() => this.coursePerformance());
  public readonly classPerformance$ = computed(() => this.classPerformance());
  public readonly recentQuizzes$ = computed(() => this.recentQuizzes());
  public readonly recentNotifications$ = computed(() => this.recentNotifications());
  public readonly recentStudents$ = computed(() => this.recentStudents());
  public readonly upcomingQuizzes$ = computed(() => this.upcomingQuizzes());
  public readonly isLoading$ = computed(() => this.isLoading());
  public readonly lastUpdated$ = computed(() => this.lastUpdated());

  // Mock data for development
  private mockStats: DashboardStats = {
    totalStudents: 2456,
    activeStudents: 2012,
    newStudentsThisMonth: 156,
    studentGrowthRate: 12.5,
    
    totalQuizzes: 84,
    activeQuizzes: 23,
    quizzesThisMonth: 12,
    quizCompletionRate: 78.4,
    
    totalResponses: 18456,
    responsesThisMonth: 3421,
    averageResponseTime: 24,
    submissionRate: 92.3,
    
    totalCourses: 48,
    activeCourses: 32,
    averageCourseParticipation: 76.8,
    
    systemUptime: 99.9,
    activeSessions: 156,
    storageUsage: 68,
    lastBackup: new Date()
  };

  private mockParticipationTrend: ParticipationTrend = {
    period: 'week',
    data: [
      { date: 'Mon', quizzesTaken: 145, studentsParticipated: 890, participationRate: 85.2 },
      { date: 'Tue', quizzesTaken: 167, studentsParticipated: 956, participationRate: 87.4 },
      { date: 'Wed', quizzesTaken: 189, studentsParticipated: 1023, participationRate: 89.1 },
      { date: 'Thu', quizzesTaken: 156, studentsParticipated: 912, participationRate: 83.7 },
      { date: 'Fri', quizzesTaken: 134, studentsParticipated: 845, participationRate: 81.5 },
      { date: 'Sat', quizzesTaken: 98, studentsParticipated: 567, participationRate: 78.2 },
      { date: 'Sun', quizzesTaken: 87, studentsParticipated: 489, participationRate: 76.4 }
    ]
  };

  private mockCourses: CoursePerformance[] = [
    { 
      courseId: '1', 
      courseName: 'Computer Science 101', 
      totalStudents: 245, 
      averageScore: 78.4, 
      completionRate: 89.2,
      participationRate: 94.3,
      topScorer: {
        studentId: 's001',
        studentName: 'John Doe',
        score: 98
      }
    },
    { 
      courseId: '2', 
      courseName: 'Mathematics 201', 
      totalStudents: 189, 
      averageScore: 82.1, 
      completionRate: 91.5,
      participationRate: 89.7
    },
    { 
      courseId: '3', 
      courseName: 'Physics 101', 
      totalStudents: 167, 
      averageScore: 75.3, 
      completionRate: 84.6,
      participationRate: 87.2
    },
    { 
      courseId: '4', 
      courseName: 'Chemistry 101', 
      totalStudents: 201, 
      averageScore: 79.8, 
      completionRate: 88.9,
      participationRate: 92.1
    }
  ];

  private mockClasses: ClassPerformance[] = [
    { 
      classId: '1', 
      className: 'L3 Info A', 
      department: 'Computer Science',
      totalStudents: 45,
      averageScore: 81.2,
      quizCompletionRate: 92.3,
      rank: 1,
      improvement: 5.4
    },
    { 
      classId: '2', 
      className: 'L3 Info B', 
      department: 'Computer Science',
      totalStudents: 42,
      averageScore: 78.9,
      quizCompletionRate: 89.7,
      rank: 2,
      improvement: 3.2
    },
    { 
      classId: '3', 
      className: 'M1 Math A', 
      department: 'Mathematics',
      totalStudents: 38,
      averageScore: 85.4,
      quizCompletionRate: 94.2,
      rank: 3,
      improvement: 6.8
    }
  ];

  constructor() {
    // Initialize with mock data
    this.loadInitialMockData();
  }

  /**
   * Load all dashboard data
   */
  loadDashboardData(filter?: AnalyticsFilter): void {
    this.isLoading.set(true);
    
    // For development, use mock data
    // In production, you would make API calls here
    of(this.mockStats).pipe(
      delay(800),
      tap(() => {
        this.loadInitialMockData();
        this.lastUpdated.set(new Date());
      }),
      catchError(error => {
        console.error('Error loading dashboard data:', error);
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe(() => {
      this.isLoading.set(false);
    });
  }

  /**
   * Refresh dashboard data
   */
  refreshDashboard(): void {
    this.isLoading.set(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Update mock data with slight variations to simulate fresh data
      this.mockStats.totalResponses += Math.floor(Math.random() * 100);
      this.mockStats.activeSessions = Math.floor(Math.random() * 50) + 100;
      this.mockStats.quizCompletionRate = 75 + Math.random() * 10;
      
      // Update signals with modified data
      this.stats.set({...this.mockStats});
      this.lastUpdated.set(new Date());
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Get dashboard statistics from API
   */
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`).pipe(
      tap(stats => this.stats.set(stats)),
      catchError(error => {
        console.error('Error fetching dashboard stats:', error);
        return of(this.mockStats);
      })
    );
  }

  /**
   * Get participation trend data
   */
  getParticipationTrend(period: 'day' | 'week' | 'month' = 'week'): Observable<ParticipationTrend> {
    return this.http.get<ParticipationTrend>(`${this.apiUrl}/participation-trend`, {
      params: { period }
    }).pipe(
      tap(trend => this.participationTrend.set(trend)),
      catchError(error => {
        console.error('Error fetching participation trend:', error);
        return of(this.mockParticipationTrend);
      })
    );
  }

  /**
   * Get course performance data
   */
  getCoursePerformance(limit: number = 10): Observable<CoursePerformance[]> {
    return this.http.get<CoursePerformance[]>(`${this.apiUrl}/course-performance`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(courses => this.coursePerformance.set(courses)),
      catchError(error => {
        console.error('Error fetching course performance:', error);
        return of(this.mockCourses);
      })
    );
  }

  /**
   * Get class performance data
   */
  getClassPerformance(limit: number = 10): Observable<ClassPerformance[]> {
    return this.http.get<ClassPerformance[]>(`${this.apiUrl}/class-performance`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(classes => this.classPerformance.set(classes)),
      catchError(error => {
        console.error('Error fetching class performance:', error);
        return of(this.mockClasses);
      })
    );
  }

  /**
   * Get recent quizzes
   */
  getRecentQuizzes(limit: number = 5): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/recent-quizzes`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(quizzes => this.recentQuizzes.set(quizzes)),
      catchError(error => {
        console.error('Error fetching recent quizzes:', error);
        return of(this.generateMockQuizzes(limit));
      })
    );
  }

  /**
   * Get upcoming quizzes
   */
  getUpcomingQuizzes(limit: number = 5): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/upcoming-quizzes`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(quizzes => this.upcomingQuizzes.set(quizzes)),
      catchError(error => {
        console.error('Error fetching upcoming quizzes:', error);
        return of(this.generateMockUpcomingQuizzes(limit));
      })
    );
  }

  /**
   * Get recent notifications
   */
  getRecentNotifications(limit: number = 5): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/recent-notifications`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(notifications => this.recentNotifications.set(notifications)),
      catchError(error => {
        console.error('Error fetching recent notifications:', error);
        return of(this.generateMockNotifications(limit));
      })
    );
  }

  /**
   * Get recently registered students
   */
  getRecentStudents(limit: number = 5): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/recent-students`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(students => this.recentStudents.set(students)),
      catchError(error => {
        console.error('Error fetching recent students:', error);
        return of(this.generateMockStudents(limit));
      })
    );
  }

  /**
   * Get chart data for visualization
   */
  getChartData(chartType: string, filter: AnalyticsFilter): Observable<ChartData> {
    return this.http.post<ChartData>(`${this.apiUrl}/charts/${chartType}`, filter).pipe(
      catchError(error => {
        console.error('Error fetching chart data:', error);
        return of(this.generateMockChartData(chartType));
      })
    );
  }

  /**
   * Get system health status
   */
  getSystemHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/system-health`).pipe(
      catchError(() => of({
        uptime: '99.9%',
        status: 'healthy',
        lastCheck: new Date(),
        services: [
          { name: 'API Server', status: 'up', responseTime: 45 },
          { name: 'Database', status: 'up', responseTime: 12 },
          { name: 'Cache', status: 'up', responseTime: 2 },
          { name: 'File Storage', status: 'up', responseTime: 120 }
        ]
      }))
    );
  }

  /**
   * Export dashboard data
   */
  exportDashboardData(format: 'pdf' | 'excel' | 'csv' = 'excel'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      params: { format },
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        console.error('Error exporting data:', error);
        throw error;
      })
    );
  }

  /**
   * Send test notification
   */
  sendTestNotification(): Observable<any> {
    return this.http.post(`${this.apiUrl}/test-notification`, {}).pipe(
      catchError(error => {
        console.error('Error sending test notification:', error);
        throw error;
      })
    );
  }

  /**
   * Clear all dashboard data
   */
  clearData(): void {
    this.stats.set(null);
    this.participationTrend.set(null);
    this.coursePerformance.set([]);
    this.classPerformance.set([]);
    this.recentQuizzes.set([]);
    this.recentNotifications.set([]);
    this.recentStudents.set([]);
    this.upcomingQuizzes.set([]);
    this.lastUpdated.set(null);
  }

  /**
   * Initialize with mock data (for development)
   */
  private loadInitialMockData(): void {
    this.stats.set(this.mockStats);
    this.participationTrend.set(this.mockParticipationTrend);
    this.coursePerformance.set(this.mockCourses);
    this.classPerformance.set(this.mockClasses);
    this.recentQuizzes.set(this.generateMockQuizzes(5));
    this.recentNotifications.set(this.generateMockNotifications(5));
    this.recentStudents.set(this.generateMockStudents(5));
    this.upcomingQuizzes.set(this.generateMockUpcomingQuizzes(3));
  }

  /**
   * Generate mock quizzes
   */
  private generateMockQuizzes(count: number): Quiz[] {
    const quizzes: Quiz[] = [];
    const statuses: QuizStatus[] = [QuizStatus.ACTIVE, QuizStatus.DRAFT, QuizStatus.SCHEDULED];
    const evaluationTypes: EvaluationType[] = [EvaluationType.MID_TERM, EvaluationType.END_OF_SEMESTER, EvaluationType.PRACTICE];
    
    for (let i = 0; i < count; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10));
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      quizzes.push({
        id: `quiz-${i + 1}`,
        title: `${evaluationTypes[i % evaluationTypes.length].replace('_', ' ').toUpperCase()} - Course ${i + 1}`,
        description: `Evaluation quiz for course ${i + 1}`,
        code: `QZ-${1000 + i}`,
        instructions: 'Complete all questions within the time limit.',
        duration: 60,
        passingScore: 50,
        maxAttempts: 1,
        showResults: true,
        shuffleQuestions: true,
        shuffleOptions: false,
        allowReview: true,
        startDate,
        endDate,
        publishDate: new Date(startDate.getTime() - 24 * 60 * 60 * 1000),
        status: statuses[i % statuses.length],
        evaluationType: evaluationTypes[i % evaluationTypes.length],
        isPublished: true,
        courseId: `course-${(i % 4) + 1}`,
        academicYearId: '2024',
        createdBy: 'admin-1',
        createdAt: new Date(startDate.getTime() - 48 * 60 * 60 * 1000),
        updatedAt: new Date(startDate.getTime() - 24 * 60 * 60 * 1000),
        accessibleClassIds: ['class-1', 'class-2'],
        questionIds: Array.from({ length: 10 }, (_, j) => `question-${j + 1}`),
        totalQuestions: 10,
        totalPoints: 100,
        totalAttempts: Math.floor(Math.random() * 200) + 50,
        averageScore: 60 + Math.random() * 30,
        completionRate: 70 + Math.random() * 25,
        participationRate: 80 + Math.random() * 15
      });
    }
    
    return quizzes;
  }

  /**
   * Generate mock upcoming quizzes
   */
  private generateMockUpcomingQuizzes(count: number): Quiz[] {
    const quizzes = this.generateMockQuizzes(count);
    
    // Modify dates to be in the future
    quizzes.forEach((quiz, i) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + i + 1);
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);
      
      quiz.startDate = startDate;
      quiz.endDate = endDate;
      quiz.status = QuizStatus.SCHEDULED;
      quiz.isPublished = false;
    });
    
    return quizzes;
  }

  /**
   * Generate mock notifications
   */
  private generateMockNotifications(count: number): Notification[] {
    const notifications: Notification[] = [];
    const types: NotificationType[] = [
      NotificationType.QUIZ_PUBLISHED,
      NotificationType.QUIZ_REMINDER,
      NotificationType.SYSTEM_ANNOUNCEMENT
    ];
    
    for (let i = 0; i < count; i++) {
      const sendAt = new Date();
      sendAt.setHours(sendAt.getHours() - i * 2);
      
      notifications.push({
        id: `notif-${i + 1}`,
        title: i === 0 ? 'New Quiz Published: CS101 Mid-Term' :
               i === 1 ? 'Reminder: Math Quiz Deadline Tomorrow' :
               'System Maintenance Scheduled',
        message: i === 0 ? 'A new quiz has been published for Computer Science 101. Please complete it before the deadline.' :
                i === 1 ? 'Don\'t forget to complete the Mathematics quiz before tomorrow at 5 PM.' :
                'System maintenance is scheduled for Sunday 2 AM - 4 AM. The platform will be unavailable during this time.',
        type: types[i % types.length],
        recipientType: 'all',
        recipientIds: ['all'],
        estimatedRecipientCount: 2456,
        sendAt,
        status: i < 2 ? NotificationStatus.SENT : NotificationStatus.SCHEDULED,
        sentAt: i < 2 ? sendAt : undefined,
        channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        deliveredCount: i < 2 ? 2300 : 0,
        readCount: i < 2 ? 1800 : 0,
        failedCount: i < 2 ? 12 : 0,
        createdBy: 'system',
        createdAt: new Date(sendAt.getTime() - 30 * 60 * 1000),
        updatedAt: new Date(sendAt.getTime() - 15 * 60 * 1000)
      });
    }
    
    return notifications;
  }

  /**
   * Generate mock students
   */
// In the generateMockStudents method:
private generateMockStudents(count: number): Student[] {
  const students: Student[] = [];
  const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
  
  for (let i = 0; i < count; i++) {
    const enrollmentDate = new Date();
    enrollmentDate.setDate(enrollmentDate.getDate() - Math.floor(Math.random() * 30));
    
    students.push({
      id: `student-${1000 + i}`,
      studentId: `STU-${2024000 + i}`,
      email: `student${1000 + i}@university.edu`,
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[i % lastNames.length],
      currentClassId: 'class-1',
      department: i % 2 === 0 ? 'Computer Science' : 'Mathematics',
      academicYearId: '2024',
      enrollmentDate,
      status: StudentStatus.ACTIVE,
      verificationStatus: VerificationStatus.VERIFIED, // Use enum instead of string
      isActive: true,
      passwordResetRequired: false,
      totalQuizzesTaken: Math.floor(Math.random() * 20) + 5,
      averageScore: 60 + Math.random() * 30,
      createdAt: enrollmentDate,
      updatedAt: enrollmentDate
    });
  }
  
  return students;
}

  /**
   * Generate mock chart data
   */
  private generateMockChartData(chartType: string): ChartData {
    switch (chartType) {
      case 'participation':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [
            {
              label: 'Participation Rate',
              data: [75, 82, 78, 85, 90],
              backgroundColor: '#6b8e7f'
            }
          ]
        };
      case 'performance':
        return {
          labels: ['CS101', 'Math201', 'Physics', 'Chemistry', 'Biology'],
          datasets: [
            {
              label: 'Average Score',
              data: [78, 82, 75, 79, 81],
              backgroundColor: '#3b82f6'
            }
          ]
        };
      default:
        return {
          labels: [],
          datasets: []
        };
    }
  }

  /**
   * Get data summary for quick stats
   */
  getQuickStats(): {
    totalStudents: number;
    activeQuizzes: number;
    pendingResponses: number;
    systemHealth: string;
  } {
    const stats = this.stats();
    return {
      totalStudents: stats?.totalStudents || 0,
      activeQuizzes: stats?.activeQuizzes || 0,
      pendingResponses: Math.floor((stats?.totalResponses || 0) * 0.1), // 10% pending
      systemHealth: stats?.systemUptime ? `${stats.systemUptime}%` : '100%'
    };
  }

  /**
   * Subscribe to real-time updates (WebSocket simulation)
   */
  subscribeToRealTimeUpdates(): void {
    // In a real application, you would connect to a WebSocket here
    // For now, we'll simulate updates with intervals
    
    // Update active sessions every 30 seconds
    setInterval(() => {
      const currentStats = this.stats();
      if (currentStats) {
        const newStats = {
          ...currentStats,
          activeSessions: Math.floor(Math.random() * 50) + 100
        };
        this.stats.set(newStats);
      }
    }, 30000);

    // Update response count every minute
    setInterval(() => {
      const currentStats = this.stats();
      if (currentStats) {
        const newStats = {
          ...currentStats,
          totalResponses: currentStats.totalResponses + Math.floor(Math.random() * 10)
        };
        this.stats.set(newStats);
      }
    }, 60000);
  }

  /**
   * Unsubscribe from real-time updates
   */
  unsubscribeFromRealTimeUpdates(): void {
    // Clear intervals (in a real app, close WebSocket connection)
    // Since we're using anonymous functions, we need to store interval IDs
    // This is a simplified version
  }
}