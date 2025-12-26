import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { 
  QuizResponse, 
  ResponseStatus, 
  SubmissionMethod, 
  QuestionAnswer 
} from '../../models/response.model';
import { Quiz, QuizStatus, EvaluationType } from '../../models/quiz.model';
import { Question, QuestionType } from '../../models/question.model';
import { Student } from '../../models/student.model';
import { SentimentAnalysis, SentimentLabel } from '../../models/sentiment-analysis.model';

interface ResponseFilter {
  quizId?: string;
  studentId?: string;
  status?: ResponseStatus[];
  dateRange?: { start: Date; end: Date };
  search?: string;
  hasSentiment?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResponseViewingService {
  private http = inject(HttpClient);
  private apiUrl = '/api/responses';

  // State management with signals
  private responses = signal<QuizResponse[]>([]);
  private isLoading = signal(false);
  private selectedResponse = signal<QuizResponse | null>(null);
  private quizzes = signal<Quiz[]>([]);
  private selectedQuiz = signal<Quiz | null>(null);
  private sentimentAnalyses = signal<Record<string, SentimentAnalysis>>({});

  // Public computed signals
  readonly responses$ = computed(() => this.responses());
  readonly isLoading$ = computed(() => this.isLoading());
  readonly selectedResponse$ = computed(() => this.selectedResponse());
  readonly quizzes$ = computed(() => this.quizzes());
  readonly selectedQuiz$ = computed(() => this.selectedQuiz());
  readonly sentimentAnalyses$ = computed(() => this.sentimentAnalyses());

  constructor() {
    this.loadInitialData();
  }

  /**
   * Load initial data for response viewing
   */
  private loadInitialData(): void {
    this.loadMockResponses();
    this.loadMockQuizzes();
    this.loadMockSentimentAnalyses();
  }

  /**
   * Load mock responses for demonstration
   */
  private loadMockResponses(): void {
    this.isLoading.set(true);
    
    const mockResponses: QuizResponse[] = [
      {
        id: '1',
        quizId: '1',
        studentId: 's001',
        startedAt: new Date('2024-03-15T10:00:00'),
        submittedAt: new Date('2024-03-15T10:45:30'),
        timeSpent: 2730, // 45 minutes 30 seconds
        answers: this.generateMockAnswers(),
        score: 85,
        totalPoints: 100,
        percentage: 85,
        passed: true,
        status: ResponseStatus.GRADED,
        submissionMethod: SubmissionMethod.ONLINE,
        isOfflineSync: false,
        deviceInfo: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          platform: 'Windows',
          ipAddress: '192.168.1.100'
        },
        isValid: true,
        sentimentScore: 0.75,
        sentimentLabel: SentimentLabel.POSITIVE,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15')
      },
      {
        id: '2',
        quizId: '1',
        studentId: 's002',
        startedAt: new Date('2024-03-15T14:30:00'),
        submittedAt: new Date('2024-03-15T15:20:15'),
        timeSpent: 3015, // 50 minutes 15 seconds
        answers: this.generateMockAnswers(),
        score: 92,
        totalPoints: 100,
        percentage: 92,
        passed: true,
        status: ResponseStatus.GRADED,
        submissionMethod: SubmissionMethod.ONLINE,
        isOfflineSync: false,
        deviceInfo: {
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          platform: 'macOS',
          ipAddress: '192.168.1.101'
        },
        isValid: true,
        sentimentScore: 0.82,
        sentimentLabel: SentimentLabel.POSITIVE,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15')
      },
      {
        id: '3',
        quizId: '1',
        studentId: 's003',
        startedAt: new Date('2024-03-16T09:15:00'),
        submittedAt: new Date('2024-03-16T10:05:45'),
        timeSpent: 3045, // 50 minutes 45 seconds
        answers: this.generateMockAnswers(),
        score: 68,
        totalPoints: 100,
        percentage: 68,
        passed: true,
        status: ResponseStatus.GRADED,
        submissionMethod: SubmissionMethod.ONLINE,
        isOfflineSync: false,
        deviceInfo: {
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
          platform: 'iOS',
          ipAddress: '192.168.1.102'
        },
        isValid: true,
        sentimentScore: 0.45,
        sentimentLabel: SentimentLabel.NEUTRAL,
        createdAt: new Date('2024-03-16'),
        updatedAt: new Date('2024-03-16')
      },
      {
        id: '4',
        quizId: '2',
        studentId: 's004',
        startedAt: new Date('2024-03-17T13:00:00'),
        submittedAt: new Date('2024-03-17T13:40:20'),
        timeSpent: 2420, // 40 minutes 20 seconds
        answers: this.generateMockAnswers(),
        score: 78,
        totalPoints: 100,
        percentage: 78,
        passed: true,
        status: ResponseStatus.GRADED,
        submissionMethod: SubmissionMethod.ONLINE,
        isOfflineSync: false,
        deviceInfo: {
          userAgent: 'Mozilla/5.0 (Android 12; Mobile) AppleWebKit/537.36',
          platform: 'Android',
          ipAddress: '192.168.1.103'
        },
        isValid: true,
        sentimentScore: 0.63,
        sentimentLabel: SentimentLabel.POSITIVE,
        createdAt: new Date('2024-03-17'),
        updatedAt: new Date('2024-03-17')
      },
      {
        id: '5',
        quizId: '1',
        studentId: 's005',
        startedAt: new Date('2024-03-18T11:30:00'),
        submittedAt: undefined,
        timeSpent: 1800, // 30 minutes
        answers: this.generateMockAnswers(),
        status: ResponseStatus.IN_PROGRESS,
        submissionMethod: SubmissionMethod.ONLINE,
        isOfflineSync: false,
        deviceInfo: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          platform: 'Windows',
          ipAddress: '192.168.1.104'
        },
        isValid: true,
        createdAt: new Date('2024-03-18'),
        updatedAt: new Date('2024-03-18')
      }
    ];

    setTimeout(() => {
      this.responses.set(mockResponses);
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Generate mock answers for responses
   */
  private generateMockAnswers(): QuestionAnswer[] {
    return [
      {
        questionId: '1',
        questionText: 'What is the time complexity of binary search?',
        questionType: QuestionType.MULTIPLE_CHOICE,
        points: 10,
        selectedOptionIds: ['2'], // O(log n)
        isCorrect: true,
        pointsAwarded: 10,
        timeSpent: 120 // 2 minutes
      },
      {
        questionId: '2',
        questionText: 'Explain the concept of object-oriented programming.',
        questionType: QuestionType.ESSAY,
        points: 20,
        textAnswer: 'Object-oriented programming is a programming paradigm based on the concept of "objects", which can contain data and code. The data is in the form of fields, and the code is in the form of procedures. A key feature is the ability to bundle data and methods that operate on that data into objects.',
        pointsAwarded: 18,
        timeSpent: 600 // 10 minutes
      },
      {
        questionId: '3',
        questionText: 'Which of the following are programming languages?',
        questionType: QuestionType.MULTIPLE_CHOICE,
        points: 15,
        selectedOptionIds: ['1', '3'], // Python and Java
        isCorrect: true,
        pointsAwarded: 15,
        timeSpent: 180 // 3 minutes
      },
      {
        questionId: '4',
        questionText: 'What is the derivative of x²?',
        questionType: QuestionType.SHORT_ANSWER,
        points: 5,
        textAnswer: '2x',
        isCorrect: true,
        pointsAwarded: 5,
        timeSpent: 60 // 1 minute
      },
      {
        questionId: '5',
        questionText: 'The Earth revolves around the Sun.',
        questionType: QuestionType.TRUE_FALSE,
        points: 5,
        selectedOptionIds: ['1'], // True
        isCorrect: true,
        pointsAwarded: 5,
        timeSpent: 30 // 30 seconds
      }
    ];
  }

  /**
   * Load mock quizzes
   */
  private loadMockQuizzes(): void {
    const mockQuizzes: Quiz[] = [
      {
        id: '1',
        title: 'Mid-Term Evaluation - CS101',
        description: 'Mid-term evaluation for Computer Science 101',
        code: 'MT-CS101-2024',
        duration: 60,
        passingScore: 50,
        maxAttempts: 1,
        showResults: true,
        shuffleQuestions: true,
        shuffleOptions: false,
        allowReview: true,
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-20'),
        status: QuizStatus.ACTIVE,
        evaluationType: EvaluationType.MID_TERM,
        isPublished: true,
        courseId: '1',
        academicYearId: '2024',
        createdBy: 'admin1',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
        accessibleClassIds: ['1', '2'],
        questionIds: ['1', '2', '3', '4', '5'],
        totalQuestions: 5,
        totalPoints: 100,
        totalAttempts: 145,
        averageScore: 78.4,
        completionRate: 92.3,
        participationRate: 94.7
      },
      {
        id: '2',
        title: 'Practice Quiz - Physics',
        description: 'Practice quiz for upcoming physics evaluation',
        code: 'PQ-PHYS101-2024',
        duration: 45,
        passingScore: 40,
        maxAttempts: 3,
        showResults: true,
        shuffleQuestions: true,
        shuffleOptions: true,
        allowReview: true,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
        status: QuizStatus.ACTIVE,
        evaluationType: EvaluationType.PRACTICE,
        isPublished: true,
        courseId: '3',
        academicYearId: '2024',
        createdBy: 'admin2',
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
        accessibleClassIds: ['2', '3'],
        questionIds: ['6', '7', '8'],
        totalQuestions: 3,
        totalPoints: 60,
        totalAttempts: 89,
        averageScore: 72.5,
        completionRate: 85.4,
        participationRate: 91.2
      }
    ];

    this.quizzes.set(mockQuizzes);
  }

  /**
   * Load mock sentiment analyses
   */
  private loadMockSentimentAnalyses(): void {
    const mockAnalyses: Record<string, SentimentAnalysis> = {
      '2': {
        id: 'sa1',
        responseId: '1',
        questionId: '2',
        studentId: 's001',
        quizId: '1',
        text: 'Object-oriented programming is a programming paradigm based on the concept of "objects", which can contain data and code.',
        cleanedText: 'object oriented programming is a programming paradigm based on the concept objects which can contain data and code',
        positiveScore: 0.85,
        negativeScore: 0.05,
        neutralScore: 0.10,
        mixedScore: 0.00,
        sentiment: SentimentLabel.POSITIVE,
        confidence: 0.92,
        emotions: {
          joy: 0.70,
          sadness: 0.05,
          anger: 0.02,
          fear: 0.03,
          surprise: 0.20
        },
        keyPhrases: ['object oriented programming', 'programming paradigm', 'objects', 'data and code'],
        topics: ['programming', 'computer science', 'software development'],
        intensity: 0.75,
        isFlagged: false,
        requiresAttention: false,
        analyzedAt: new Date('2024-03-15T11:00:00'),
        analysisModel: 'sentiment-v2',
        processingTime: 120
      }
    };

    this.sentimentAnalyses.set(mockAnalyses);
  }

  /**
   * Filter responses based on criteria
   */
  filterResponses(filters: ResponseFilter): QuizResponse[] {
    let filteredResponses = this.responses();

    if (filters.quizId) {
      filteredResponses = filteredResponses.filter(r => r.quizId === filters.quizId);
    }

    if (filters.status?.length) {
      filteredResponses = filteredResponses.filter(r => filters.status!.includes(r.status));
    }

    if (filters.dateRange) {
      filteredResponses = filteredResponses.filter(r => {
        const submittedDate = r.submittedAt || r.createdAt;
        return submittedDate >= filters.dateRange!.start && 
               submittedDate <= filters.dateRange!.end;
      });
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      // In a real app, you would search across student names, quiz titles, etc.
      // For now, we'll just filter by ID
      filteredResponses = filteredResponses.filter(r => 
        r.id.toLowerCase().includes(searchLower) ||
        r.studentId.toLowerCase().includes(searchLower)
      );
    }

    if (filters.hasSentiment !== undefined) {
      filteredResponses = filteredResponses.filter(r => 
        filters.hasSentiment ? r.sentimentScore !== undefined : r.sentimentScore === undefined
      );
    }

    return filteredResponses;
  }

  /**
   * Get responses for a specific quiz
   */
  getResponsesByQuiz(quizId: string): Observable<QuizResponse[]> {
    this.isLoading.set(true);
    
    const filteredResponses = this.responses().filter(r => r.quizId === quizId);
    
    return of(filteredResponses).pipe(
      tap(() => {
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Get a specific response by ID
   */
  getResponseById(id: string): Observable<QuizResponse | null> {
    this.isLoading.set(true);
    
    const response = this.responses().find(r => r.id === id) || null;
    
    return of(response).pipe(
      tap(() => {
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Get sentiment analysis for a response
   */
  getSentimentAnalysis(responseId: string): SentimentAnalysis | null {
    return this.sentimentAnalyses()[responseId] || null;
  }

  /**
   * Select a quiz for filtering
   */
  selectQuiz(quiz: Quiz | null): void {
    this.selectedQuiz.set(quiz);
  }

  /**
   * Select a response for detailed viewing
   */
  selectResponse(response: QuizResponse | null): void {
    this.selectedResponse.set(response);
  }

  /**
   * Get response status color
   */
  getStatusColor(status: ResponseStatus): string {
    switch (status) {
      case ResponseStatus.GRADED: return '#10b981'; // green
      case ResponseStatus.SUBMITTED: return '#3b82f6'; // blue
      case ResponseStatus.IN_PROGRESS: return '#f59e0b'; // amber
      case ResponseStatus.OVERDUE: return '#ef4444'; // red
      case ResponseStatus.INVALID: return '#6b7280'; // gray
      default: return '#6b7280';
    }
  }

  /**
   * Get sentiment color
   */
  getSentimentColor(sentiment: string): string {
    switch (sentiment) {
      case SentimentLabel.POSITIVE: return '#10b981'; // green
      case SentimentLabel.NEGATIVE: return '#ef4444'; // red
      case SentimentLabel.NEUTRAL: return '#6b7280'; // gray
      case SentimentLabel.MIXED: return '#8b5cf6'; // purple
      default: return '#6b7280';
    }
  }

  /**
   * Format time spent in minutes
   */
  formatTimeSpent(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Export responses data
   */
  exportResponses(quizId?: string, format: 'csv' | 'excel' = 'excel'): Observable<any> {
    const responses = quizId ? 
      this.responses().filter(r => r.quizId === quizId) : 
      this.responses();
    
    // In a real app, this would make an API call to export data
    console.log(`Exporting ${responses.length} responses in ${format} format`);
    
    return of({ success: true, count: responses.length });
  }

  /**
   * Get statistics for responses
   */
  getResponseStats(quizId?: string) {
    const responses = quizId ? 
      this.responses().filter(r => r.quizId === quizId) : 
      this.responses();
    
    const gradedResponses = responses.filter(r => r.status === ResponseStatus.GRADED);
    const averageScore = gradedResponses.length > 0 ? 
      gradedResponses.reduce((sum, r) => sum + (r.percentage || 0), 0) / gradedResponses.length : 0;
    
    const sentimentDistribution = {
      [SentimentLabel.POSITIVE]: responses.filter(r => r.sentimentLabel === SentimentLabel.POSITIVE).length,
      [SentimentLabel.NEGATIVE]: responses.filter(r => r.sentimentLabel === SentimentLabel.NEGATIVE).length,
      [SentimentLabel.NEUTRAL]: responses.filter(r => r.sentimentLabel === SentimentLabel.NEUTRAL).length,
      [SentimentLabel.MIXED]: responses.filter(r => r.sentimentLabel === SentimentLabel.MIXED).length
    };

    return {
      totalResponses: responses.length,
      gradedResponses: gradedResponses.length,
      averageScore: averageScore,
      completionRate: (gradedResponses.length / responses.length) * 100,
      sentimentDistribution: sentimentDistribution
    };
  }
}