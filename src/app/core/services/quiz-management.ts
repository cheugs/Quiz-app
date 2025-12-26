// src/app/core/services/quiz-management.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Quiz, QuizStatus, EvaluationType } from '../../models/quiz.model';
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';
import { Question, QuestionType, DifficultyLevel } from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizManagementService {
  private http = inject(HttpClient);
  private apiUrl = '/api/quizzes';

  // State management with signals
  private quizzes = signal<Quiz[]>([]);
  private isLoading = signal(false);
  private selectedQuiz = signal<Quiz | null>(null);
  private courses = signal<Course[]>([]);
  private classes = signal<Class[]>([]);
  private questions = signal<Question[]>([]);
  private selectedQuestions = signal<Question[]>([]);

  // Public computed signals
  readonly quizzes$ = computed(() => this.quizzes());
  readonly isLoading$ = computed(() => this.isLoading());
  readonly selectedQuiz$ = computed(() => this.selectedQuiz());
  readonly courses$ = computed(() => this.courses());
  readonly classes$ = computed(() => this.classes());
  readonly questions$ = computed(() => this.questions());
  readonly selectedQuestions$ = computed(() => this.selectedQuestions());

  constructor() {
    this.loadInitialData();
  }

  /**
   * Load initial data for quiz management
   */
  private loadInitialData(): void {
    this.loadQuizzes();
    this.loadCourses();
    this.loadClasses();
    this.loadQuestions();
  }

  loadQuestions(): void {
    // Mock questions data
    const mockQuestions: Question[] = [
      {
        id: '1',
        text: 'What is the time complexity of binary search?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          { id: '1', text: 'O(n)', isCorrect: false, order: 1 },
          { id: '2', text: 'O(log n)', isCorrect: true, order: 2 },
          { id: '3', text: 'O(n²)', isCorrect: false, order: 3 },
          { id: '4', text: 'O(1)', isCorrect: false, order: 4 }
        ],
        correctOptionIds: ['2'],
        points: 10,
        difficulty: DifficultyLevel.MEDIUM,
        topic: 'Algorithms',
        tags: ['complexity', 'search'],
        courseId: '1',
        usedInQuizIds: ['1'],
        usageCount: 5,
        version: 1,
        createdBy: 'admin1',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        text: 'Explain the concept of object-oriented programming.',
        type: QuestionType.ESSAY,
        points: 20,
        difficulty: DifficultyLevel.EASY,
        topic: 'Programming Paradigms',
        tags: ['OOP', 'programming'],
        courseId: '1',
        usedInQuizIds: ['1', '3'],
        usageCount: 3,
        version: 1,
        createdBy: 'admin1',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      },
      {
        id: '3',
        text: 'Which of the following are programming languages?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          { id: '1', text: 'Python', isCorrect: true, order: 1 },
          { id: '2', text: 'HTML', isCorrect: false, order: 2 },
          { id: '3', text: 'Java', isCorrect: true, order: 3 },
          { id: '4', text: 'CSS', isCorrect: false, order: 4 }
        ],
        correctOptionIds: ['1', '3'],
        points: 15,
        difficulty: DifficultyLevel.EASY,
        topic: 'Programming',
        tags: ['languages', 'basics'],
        courseId: '1',
        usedInQuizIds: ['2'],
        usageCount: 4,
        version: 1,
        createdBy: 'admin1',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03')
      },
      {
        id: '4',
        text: 'What is the derivative of x²?',
        type: QuestionType.SHORT_ANSWER,
        correctAnswer: '2x',
        points: 5,
        difficulty: DifficultyLevel.EASY,
        topic: 'Calculus',
        tags: ['derivative', 'math'],
        courseId: '2',
        usedInQuizIds: ['3'],
        usageCount: 2,
        version: 1,
        createdBy: 'admin2',
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04')
      },
      {
        id: '5',
        text: 'The Earth revolves around the Sun.',
        type: QuestionType.TRUE_FALSE,
        options: [
          { id: '1', text: 'True', isCorrect: true, order: 1 },
          { id: '2', text: 'False', isCorrect: false, order: 2 }
        ],
        correctOptionIds: ['1'],
        points: 5,
        difficulty: DifficultyLevel.EASY,
        topic: 'Astronomy',
        tags: ['science', 'basic'],
        courseId: '3',
        usedInQuizIds: [],
        usageCount: 0,
        version: 1,
        createdBy: 'admin3',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      }
    ];

    this.questions.set(mockQuestions);
  }

    /**
   * Get questions by course and class level
   */
  getQuestionsByCourseAndLevel(courseId: string, classLevel?: string): Observable<Question[]> {
    // Filter questions by course
    let filteredQuestions = this.questions().filter(q => q.courseId === courseId);
    
    // In a real app, you would also filter by class level
    // This is a simplified version
    
    return of(filteredQuestions);
  }

  /**
   * Load all quizzes
   */
  loadQuizzes(): void {
    this.isLoading.set(true);
    
    // Mock data - replace with actual API call
    const mockQuizzes: Quiz[] = [
      {
        id: '1',
        title: 'Mid-Term Evaluation - CS101',
        description: 'Mid-term evaluation for Computer Science 101',
        code: 'MT-CS101-2024',
        instructions: 'Complete all questions within 60 minutes',
        duration: 60,
        passingScore: 50,
        maxAttempts: 1,
        showResults: true,
        shuffleQuestions: true,
        shuffleOptions: false,
        allowReview: true,
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-20'),
        publishDate: new Date('2024-03-10'),
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
        title: 'End of Semester Exam - MATH201',
        description: 'Final examination for Mathematics 201',
        code: 'FINAL-MATH201-2024',
        instructions: 'Answer all questions. Calculators allowed.',
        duration: 120,
        passingScore: 60,
        maxAttempts: 1,
        showResults: true,
        shuffleQuestions: false,
        shuffleOptions: true,
        allowReview: false,
        startDate: new Date('2024-06-10'),
        endDate: new Date('2024-06-15'),
        publishDate: new Date('2024-06-05'),
        status: QuizStatus.SCHEDULED,
        evaluationType: EvaluationType.FINAL_EXAM,
        isPublished: true,
        courseId: '2',
        academicYearId: '2024',
        createdBy: 'admin1',
        createdAt: new Date('2024-05-20'),
        updatedAt: new Date('2024-05-20'),
        accessibleClassIds: ['1', '2', '3'],
        questionIds: ['6', '7', '8', '9', '10', '11', '12'],
        totalQuestions: 7,
        totalPoints: 150,
        totalAttempts: 0,
        averageScore: 0,
        completionRate: 0,
        participationRate: 0
      },
      {
        id: '3',
        title: 'Practice Quiz - Physics',
        description: 'Practice quiz for upcoming physics evaluation',
        code: 'PQ-PHYS101-2024',
        instructions: 'Practice questions for revision',
        duration: 45,
        passingScore: 40,
        maxAttempts: 3,
        showResults: true,
        shuffleQuestions: true,
        shuffleOptions: true,
        allowReview: true,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
        publishDate: new Date('2024-03-25'),
        status: QuizStatus.ACTIVE,
        evaluationType: EvaluationType.PRACTICE,
        isPublished: true,
        courseId: '3',
        academicYearId: '2024',
        createdBy: 'admin2',
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
        accessibleClassIds: ['2', '3'],
        questionIds: ['13', '14', '15'],
        totalQuestions: 3,
        totalPoints: 60,
        totalAttempts: 89,
        averageScore: 72.5,
        completionRate: 85.4,
        participationRate: 91.2
      },
      {
        id: '4',
        title: 'Draft Quiz - Chemistry',
        description: 'Chemistry assignment draft',
        code: 'ASSIGN-CHEM101-2024',
        instructions: 'Complete the assignment questions',
        duration: 90,
        passingScore: 50,
        maxAttempts: 2,
        showResults: true,
        shuffleQuestions: false,
        shuffleOptions: false,
        allowReview: true,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-05-10'),
        publishDate: undefined,
        status: QuizStatus.DRAFT,
        evaluationType: EvaluationType.ASSIGNMENT,
        isPublished: false,
        courseId: '4',
        academicYearId: '2024',
        createdBy: 'admin1',
        createdAt: new Date('2024-04-20'),
        updatedAt: new Date('2024-04-20'),
        accessibleClassIds: ['1'],
        questionIds: ['16', '17', '18', '19'],
        totalQuestions: 4,
        totalPoints: 80,
        totalAttempts: 0,
        averageScore: 0,
        completionRate: 0,
        participationRate: 0
      }
    ];

    setTimeout(() => {
      this.quizzes.set(mockQuizzes);
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Load courses
   */
  private loadCourses(): void {
    const mockCourses: Course[] = [
      {
        id: '1',
        code: 'CS101',
        name: 'Computer Science 101',
        description: 'Introduction to Computer Science',
        credits: 3,
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        semesterNumber: 1,
        classIds: ['1', '2'],
        instructorIds: ['inst1'],
        studentCount: 245,
        quizCount: 5,
        averageParticipationRate: 92.5,
        isActive: true,
        hasPrerequisites: false,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '2',
        code: 'MATH201',
        name: 'Mathematics 201',
        description: 'Advanced Mathematics',
        credits: 4,
        department: 'Mathematics',
        departmentCode: 'MATH',
        academicYearId: '2024',
        semesterNumber: 2,
        classIds: ['1', '2', '3'],
        instructorIds: ['inst2'],
        studentCount: 189,
        quizCount: 3,
        averageParticipationRate: 89.7,
        isActive: true,
        hasPrerequisites: true,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '3',
        code: 'PHYS101',
        name: 'Physics 101',
        description: 'Introduction to Physics',
        credits: 3,
        department: 'Physics',
        departmentCode: 'PHYS',
        academicYearId: '2024',
        semesterNumber: 1,
        classIds: ['2', '3'],
        instructorIds: ['inst3'],
        studentCount: 150,
        quizCount: 2,
        averageParticipationRate: 88.3,
        isActive: true,
        hasPrerequisites: false,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '4',
        code: 'CHEM101',
        name: 'Chemistry 101',
        description: 'Introduction to Chemistry',
        credits: 3,
        department: 'Chemistry',
        departmentCode: 'CHEM',
        academicYearId: '2024',
        semesterNumber: 1,
        classIds: ['1'],
        instructorIds: ['inst4'],
        studentCount: 120,
        quizCount: 1,
        averageParticipationRate: 85.2,
        isActive: true,
        hasPrerequisites: false,
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
   * Load classes
   */
  private loadClasses(): void {
    const mockClasses: Class[] = [
      {
        id: '1',
        name: 'L3 Informatique Groupe A',
        code: 'L3-INFO-A',
        level: 'L3',
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        maxStudents: 50,
        currentStudentCount: 45,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['1', '2', '4'],
        coordinatorId: 'coord1',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 92.3,
        totalQuizzesTaken: 5,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '2',
        name: 'L3 Informatique Groupe B',
        code: 'L3-INFO-B',
        level: 'L3',
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        maxStudents: 50,
        currentStudentCount: 42,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['1', '2', '3'],
        coordinatorId: 'coord1',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 89.7,
        totalQuizzesTaken: 5,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '3',
        name: 'L3 Physique Groupe A',
        code: 'L3-PHYS-A',
        level: 'L3',
        department: 'Physics',
        departmentCode: 'PHYS',
        academicYearId: '2024',
        maxStudents: 40,
        currentStudentCount: 35,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['2', '3'],
        coordinatorId: 'coord2',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 87.5,
        totalQuizzesTaken: 4,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      }
    ];

    this.classes.set(mockClasses);
  }

  /**
   * Create a new quiz
   */
  createQuiz(quizData: Partial<Quiz>): Observable<Quiz> {
    this.isLoading.set(true);
    
    // Mock API call
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizData.title || 'New Quiz',
      description: quizData.description || '',
      code: this.generateQuizCode(quizData.title || 'New Quiz'),
      instructions: quizData.instructions || '',
      duration: quizData.duration || 60,
      passingScore: quizData.passingScore || 50,
      maxAttempts: quizData.maxAttempts || 1,
      showResults: quizData.showResults ?? true,
      shuffleQuestions: quizData.shuffleQuestions ?? false,
      shuffleOptions: quizData.shuffleOptions ?? false,
      allowReview: quizData.allowReview ?? true,
      startDate: quizData.startDate || new Date(),
      endDate: quizData.endDate || new Date(),
      publishDate: undefined,
      status: quizData.status || QuizStatus.DRAFT,
      evaluationType: quizData.evaluationType || EvaluationType.MID_TERM,
      isPublished: quizData.isPublished ?? false,
      courseId: quizData.courseId || '',
      academicYearId: quizData.academicYearId || '2024',
      createdBy: 'current-user-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      accessibleClassIds: quizData.accessibleClassIds || [],
      questionIds: quizData.questionIds || [],
      totalQuestions: quizData.totalQuestions || 0,
      totalPoints: quizData.totalPoints || 0,
      totalAttempts: quizData.totalAttempts || 0,
      averageScore: 0,
      completionRate: 0,
      participationRate: 0
    };

    return of(newQuiz).pipe(
      tap(quiz => {
        this.quizzes.update(quizzes => [...quizzes, quiz]);
        this.isLoading.set(false);
      })
    );
  }

    /**
   * Get questions for a quiz
   */
  getQuizQuestions(quizId: string): Question[] {
    const quiz = this.quizzes().find(q => q.id === quizId);
    if (!quiz) return [];
    
    return this.questions().filter(q => quiz.questionIds.includes(q.id));
  }

  /**
   * Add questions to quiz
   */
  addQuestionsToQuiz(quizId: string, questionIds: string[]): Observable<Quiz> {
    const quiz = this.quizzes().find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Add new question IDs (avoid duplicates)
    const newQuestionIds = [...new Set([...quiz.questionIds, ...questionIds])];
    
    return this.updateQuiz(quizId, {
      questionIds: newQuestionIds,
      totalQuestions: newQuestionIds.length,
      totalPoints: this.calculateTotalPoints(newQuestionIds)
    });
  }

  /**
   * Remove question from quiz
   */
  removeQuestionFromQuiz(quizId: string, questionId: string): Observable<Quiz> {
    const quiz = this.quizzes().find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const newQuestionIds = quiz.questionIds.filter(id => id !== questionId);
    
    return this.updateQuiz(quizId, {
      questionIds: newQuestionIds,
      totalQuestions: newQuestionIds.length,
      totalPoints: this.calculateTotalPoints(newQuestionIds)
    });
  }

  /**
   * Calculate total points for questions
   */
  private calculateTotalPoints(questionIds: string[]): number {
    const questions = this.questions().filter(q => questionIds.includes(q.id));
    return questions.reduce((total, q) => total + q.points, 0);
  }

  /**
   * Set selected questions
   */
  setSelectedQuestions(questions: Question[]): void {
    this.selectedQuestions.set(questions);
  }

  /**
   * Clear selected questions
   */
  clearSelectedQuestions(): void {
    this.selectedQuestions.set([]);
  }


  /**
   * Update an existing quiz
   */
  updateQuiz(id: string, quizData: Partial<Quiz>): Observable<Quiz> {
    this.isLoading.set(true);
    
    const existingQuiz = this.quizzes().find(q => q.id === id);
    if (!existingQuiz) {
      throw new Error('Quiz not found');
    }

    const updatedQuiz: Quiz = {
      ...existingQuiz,
      ...quizData,
      updatedAt: new Date()
    };

    return of(updatedQuiz).pipe(
      tap(quiz => {
        this.quizzes.update(quizzes => 
          quizzes.map(q => q.id === id ? updatedQuiz : q)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Delete a quiz
   */
  deleteQuiz(id: string): Observable<void> {
    this.isLoading.set(true);
    
    return of(void 0).pipe(
      tap(() => {
        this.quizzes.update(quizzes => quizzes.filter(q => q.id !== id));
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Publish a quiz
   */
  publishQuiz(id: string): Observable<Quiz> {
    this.isLoading.set(true);
    
    const quizToPublish = this.quizzes().find(q => q.id === id);
    if (!quizToPublish) {
      throw new Error('Quiz not found');
    }

    const publishedQuiz: Quiz = {
      ...quizToPublish,
      status: QuizStatus.ACTIVE,
      isPublished: true,
      publishDate: new Date(),
      updatedAt: new Date()
    };

    return of(publishedQuiz).pipe(
      tap(quiz => {
        this.quizzes.update(quizzes => 
          quizzes.map(q => q.id === id ? publishedQuiz : q)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Duplicate a quiz
   */
  duplicateQuiz(id: string): Observable<Quiz> {
    this.isLoading.set(true);
    
    const originalQuiz = this.quizzes().find(q => q.id === id);
    if (!originalQuiz) {
      throw new Error('Quiz not found');
    }

    const duplicatedQuiz: Quiz = {
      ...originalQuiz,
      id: Date.now().toString(),
      title: `${originalQuiz.title} (Copy)`,
      code: `${originalQuiz.code}-COPY`,
      status: QuizStatus.DRAFT,
      isPublished: false,
      totalAttempts: 0,
      averageScore: 0,
      completionRate: 0,
      participationRate: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(duplicatedQuiz).pipe(
      tap(quiz => {
        this.quizzes.update(quizzes => [...quizzes, quiz]);
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Select a quiz
   */
  selectQuiz(quiz: Quiz | null): void {
    this.selectedQuiz.set(quiz);
  }

  /**
   * Generate quiz code
   */
  private generateQuizCode(title: string): string {
    const prefix = title.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  }

  /**
   * Filter quizzes
   */
  filterQuizzes(filters: {
    status?: QuizStatus[];
    courseId?: string;
    evaluationType?: EvaluationType[];
    search?: string;
  }): Quiz[] {
    let filteredQuizzes = this.quizzes();

    if (filters.status?.length) {
      filteredQuizzes = filteredQuizzes.filter(q => filters.status!.includes(q.status));
    }

    if (filters.courseId) {
      filteredQuizzes = filteredQuizzes.filter(q => q.courseId === filters.courseId);
    }

    if (filters.evaluationType?.length) {
      filteredQuizzes = filteredQuizzes.filter(q => filters.evaluationType!.includes(q.evaluationType));
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(q => 
        q.title.toLowerCase().includes(searchLower) ||
        q.description?.toLowerCase().includes(searchLower) ||
        q.code.toLowerCase().includes(searchLower)
      );
    }

    return filteredQuizzes;
  }

  /**
   * Get quiz status badge color
   */
  getStatusColor(status: QuizStatus): string {
    switch (status) {
      case QuizStatus.ACTIVE: return '#10b981'; // green
      case QuizStatus.DRAFT: return '#6b7280'; // gray
      case QuizStatus.SCHEDULED: return '#3b82f6'; // blue
      case QuizStatus.CLOSED: return '#ef4444'; // red
      case QuizStatus.ARCHIVED: return '#8b5cf6'; // purple
      default: return '#6b7280';
    }
  }

  /**
   * Get evaluation type badge color
   */
  getEvaluationTypeColor(type: EvaluationType): string {
    switch (type) {
      case EvaluationType.MID_TERM: return '#f59e0b'; // amber
      case EvaluationType.END_OF_SEMESTER: return '#ef4444'; // red
      case EvaluationType.FINAL_EXAM: return '#8b5cf6'; // purple
      case EvaluationType.PRACTICE: return '#3b82f6'; // blue
      case EvaluationType.ASSIGNMENT: return '#10b981'; // green
      default: return '#6b7280';
    }
  }

   /**
   * Get question type label
   */
  getQuestionTypeLabel(type: QuestionType): string {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE: return 'Multiple Choice';
      case QuestionType.TRUE_FALSE: return 'True/False';
      case QuestionType.SHORT_ANSWER: return 'Short Answer';
      case QuestionType.ESSAY: return 'Essay';
      case QuestionType.MATCHING: return 'Matching';
      case QuestionType.FILL_BLANK: return 'Fill in Blank';
      case QuestionType.RATING_SCALE: return 'Rating Scale';
      default: return 'Unknown';
    }
  }

  /**
   * Get difficulty color
   */
  getDifficultyColor(difficulty: DifficultyLevel): string {
    switch (difficulty) {
      case DifficultyLevel.EASY: return '#10b981'; // green
      case DifficultyLevel.MEDIUM: return '#f59e0b'; // amber
      case DifficultyLevel.HARD: return '#ef4444'; // red
      default: return '#6b7280';
    }
  }
}