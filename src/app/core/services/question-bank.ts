import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question, QuestionType, DifficultyLevel, QuestionOption, QuestionBankFilter } from '../../models/question.model';
import { Course } from '../../models/course.model';
import { ApiResponse, PaginatedResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private apiUrl = '/api/questions';
  
  // Signals for reactive state
  private questions = signal<Question[]>([]);
  private courses = signal<Course[]>([]);
  private isLoading = signal(false);
  private totalQuestions = signal(0);
  private selectedFilters = signal<QuestionBankFilter>({});
  
  // Computed signals
  readonly questions$ = computed(() => this.questions());
  readonly courses$ = computed(() => this.courses());
  readonly isLoading$ = computed(() => this.isLoading());
  readonly totalQuestions$ = computed(() => this.totalQuestions());
  readonly selectedFilters$ = computed(() => this.selectedFilters());
  readonly questionTypes = Object.values(QuestionType);
  readonly difficultyLevels = Object.values(DifficultyLevel);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  /**
   * Load initial data
   */
  loadInitialData(): void {
    this.loadCourses();
    this.loadQuestions();
  }

  /**
   * Load all questions with pagination
   */
  loadQuestions(page = 1, limit = 10, filters?: QuestionBankFilter): void {
    this.isLoading.set(true);
    
    // Mock data - replace with actual API call
    const mockQuestions: Question[] = Array.from({ length: 25 }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Sample question ${i + 1} about ${['Computer Science', 'Mathematics', 'Physics', 'Chemistry'][i % 4]}`,
      type: [QuestionType.MULTIPLE_CHOICE, QuestionType.TRUE_FALSE, QuestionType.SHORT_ANSWER, QuestionType.ESSAY][i % 4],
      options: i % 4 === 0 ? [
        { id: '1', text: 'Option A', isCorrect: true, order: 1 },
        { id: '2', text: 'Option B', isCorrect: false, order: 2 },
        { id: '3', text: 'Option C', isCorrect: false, order: 3 },
        { id: '4', text: 'Option D', isCorrect: false, order: 4 }
      ] : undefined,
      correctOptionIds: i % 4 === 0 ? ['1'] : undefined,
      correctAnswer: i % 4 === 2 ? 'Sample correct answer' : undefined,
      points: 10,
      difficulty: [DifficultyLevel.EASY, DifficultyLevel.MEDIUM, DifficultyLevel.HARD][i % 3],
      topic: ['Programming', 'Calculus', 'Mechanics', 'Organic Chemistry'][i % 4],
      tags: ['tag1', 'tag2', 'exam'],
      courseId: `c${(i % 4) + 1}`,
      usedInQuizIds: [`qz${i + 1}`],
      usageCount: Math.floor(Math.random() * 10),
      version: 1,
      createdBy: 'admin1',
      createdAt: new Date(Date.now() - i * 86400000),
      updatedAt: new Date(Date.now() - i * 86400000),
      lastUsedAt: i % 3 === 0 ? new Date(Date.now() - i * 86400000) : undefined
    }));
    
    setTimeout(() => {
      this.questions.set(mockQuestions.slice((page - 1) * limit, page * limit));
      this.totalQuestions.set(mockQuestions.length);
      this.isLoading.set(false);
    }, 500);
  }

  /**
   * Load courses for filter dropdown
   */
 
loadCourses(): void {
  const mockCourses: Course[] = [
    {
      id: 'c1',
      code: 'CS101',
      name: 'Computer Science 101',
      description: 'Introduction to Computer Science',
      credits: 3,
      department: 'Computer Science',
      departmentCode: 'CS',
      academicYearId: '2024',
      semesterNumber: 1,
      classIds: ['cl1', 'cl2'],
      instructorIds: ['inst1'],
      studentCount: 245,
      quizCount: 12,
      isActive: true,
      hasPrerequisites: false, // Add this property
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-30'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    },
    {
      id: 'c2',
      code: 'MATH201',
      name: 'Mathematics 201',
      description: 'Advanced Mathematics',
      credits: 4,
      department: 'Mathematics',
      departmentCode: 'MATH',
      academicYearId: '2024',
      semesterNumber: 1,
      classIds: ['cl3'],
      instructorIds: ['inst2'],
      studentCount: 189,
      quizCount: 8,
      isActive: true,
      hasPrerequisites: true, // Add this property
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-30'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    },
    {
      id: 'c3',
      code: 'PHYS101',
      name: 'Physics 101',
      description: 'Introduction to Physics',
      credits: 4,
      department: 'Physics',
      departmentCode: 'PHYS',
      academicYearId: '2024',
      semesterNumber: 1,
      classIds: ['cl4'],
      instructorIds: ['inst3'],
      studentCount: 167,
      quizCount: 10,
      isActive: true,
      hasPrerequisites: false, // Add this property
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-30'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    }
  ];
  
  this.courses.set(mockCourses);
}

  /**
   * Apply filters to questions
   */
  applyFilters(filters: QuestionBankFilter): void {
    this.selectedFilters.set(filters);
    this.loadQuestions(1, 10, filters);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.selectedFilters.set({});
    this.loadQuestions();
  }

  /**
   * Get question by ID
   */
  getQuestionById(id: string): Observable<ApiResponse<Question>> {
    return this.http.get<ApiResponse<Question>>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching question:', error);
        return of({
          success: false,
          message: 'Failed to fetch question',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Create new question
   */
  createQuestion(questionData: Partial<Question>): Observable<ApiResponse<Question>> {
    return this.http.post<ApiResponse<Question>>(this.apiUrl, questionData).pipe(
      catchError(error => {
        console.error('Error creating question:', error);
        return of({
          success: false,
          message: 'Failed to create question',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Update question
   */
  updateQuestion(id: string, questionData: Partial<Question>): Observable<ApiResponse<Question>> {
    return this.http.put<ApiResponse<Question>>(`${this.apiUrl}/${id}`, questionData).pipe(
      catchError(error => {
        console.error('Error updating question:', error);
        return of({
          success: false,
          message: 'Failed to update question',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Delete question
   */
  deleteQuestion(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting question:', error);
        return of({
          success: false,
          message: 'Failed to delete question',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Duplicate question
   */
  duplicateQuestion(id: string): Observable<ApiResponse<Question>> {
    return this.http.post<ApiResponse<Question>>(`${this.apiUrl}/${id}/duplicate`, {}).pipe(
      catchError(error => {
        console.error('Error duplicating question:', error);
        return of({
          success: false,
          message: 'Failed to duplicate question',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Import questions from Excel
   */
  importQuestions(file: File): Observable<ApiResponse<{ imported: number, failed: number }>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<ApiResponse<{ imported: number, failed: number }>>(`${this.apiUrl}/import`, formData).pipe(
      catchError(error => {
        console.error('Error importing questions:', error);
        return of({
          success: false,
          message: 'Failed to import questions',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Export questions
   */
  exportQuestions(format: 'excel' | 'csv' = 'excel', filters?: QuestionBankFilter): Observable<Blob> {
    let url = `${this.apiUrl}/export?format=${format}`;
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      url += `&${params.toString()}`;
    }
    
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error exporting questions:', error);
        throw error;
      })
    );
  }

  /**
   * Get question statistics
   */
  getQuestionStatistics(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/statistics`).pipe(
      catchError(error => {
        console.error('Error fetching statistics:', error);
        return of({
          success: false,
          message: 'Failed to fetch statistics',
          timestamp: new Date()
        });
      })
    );
  }

  /**
   * Get question type display name
   */
  getQuestionTypeDisplay(type: QuestionType): string {
    const typeMap: Record<QuestionType, string> = {
      [QuestionType.MULTIPLE_CHOICE]: 'Multiple Choice',
      [QuestionType.TRUE_FALSE]: 'True/False',
      [QuestionType.SHORT_ANSWER]: 'Short Answer',
      [QuestionType.ESSAY]: 'Essay',
      [QuestionType.MATCHING]: 'Matching',
      [QuestionType.FILL_BLANK]: 'Fill in Blank',
      [QuestionType.RATING_SCALE]: 'Rating Scale'
    };
    return typeMap[type] || type;
  }

  /**
   * Get difficulty level color
   */
  getDifficultyColor(difficulty: DifficultyLevel): string {
    const colorMap: Record<DifficultyLevel, string> = {
      [DifficultyLevel.EASY]: '#10b981', // Green
      [DifficultyLevel.MEDIUM]: '#f59e0b', // Amber
      [DifficultyLevel.HARD]: '#ef4444' // Red
    };
    return colorMap[difficulty] || '#6b7280';
  }

  /**
   * Format date
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}