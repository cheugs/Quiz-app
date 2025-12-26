// src/app/features/quiz-management/quiz-management.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { QuizManagementService } from '../../core/services/quiz-management';
import { Quiz, QuizStatus, EvaluationType } from '../../models/quiz.model';
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';
import { Question, QuestionType, DifficultyLevel } from '../../models/question.model';

// Import icon components (add missing ones)
import { 
  QuizIconComponent, 
  CalendarIconComponent, 
  ClockIconComponent, 
  UsersIconComponent,
  TrendingUpIconComponent,
  TrendingDownIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  CopyIconComponent,
  EyeIconComponent,
  UploadIconComponent,
  DownloadIconComponent,
  FilterIconComponent,
  SearchIconComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  MoreIconComponent,
  PlusIconComponent,
  BarChartIconComponent,
  CheckIconComponent,
  XIconComponent,
  RefreshIconComponent,
  SaveIconComponent,
  BookIconComponent,
  SchoolIconComponent,
  TimerIconComponent,
  CheckSquareIconComponent,
  ShuffleIconComponent,
  EyeOffIconComponent,
  LayersIconComponent,
  PercentIconComponent,
  SendIconComponent,
  TagIconComponent,
  RepeatIconComponent,
  SquareIconComponent,
  ChevronLeftIconComponent,
  ChevronRightIconComponent,
  FileTextIconComponent,
  InfoIconComponent,
  ListIconComponent,
  HashIconComponent,
  TypeIconComponent,
  AwardIconComponent,
  CheckCircleIconComponent,
  CircleIconComponent,
  XCircleIconComponent,
  MinusIconComponent
} from '../../../assets/icon-dashboard';

interface StatusOption {
  value: QuizStatus;
  label: string;
  color: string;
}

interface EvaluationTypeOption {
  value: EvaluationType;
  label: string;
  color: string;
}

interface ClassOption {
  id: string;
  name: string;
  selected: boolean;
}

interface QuestionFilter {
  search: string;
  type: QuestionType | '';
  difficulty: DifficultyLevel | '';
  selectedOnly: boolean;
}

interface QuestionTypeSummary {
  type: string;
  count: number;
}

@Component({
  selector: 'app-quiz-management',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    // Icon components
    QuizIconComponent,
    CalendarIconComponent,
    ClockIconComponent,
    UsersIconComponent,
    TrendingUpIconComponent,
    TrendingDownIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    CopyIconComponent,
    EyeIconComponent,
    UploadIconComponent,
    DownloadIconComponent,
    FilterIconComponent,
    SearchIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    MoreIconComponent,
    PlusIconComponent,
    BarChartIconComponent,
    CheckIconComponent,
    XIconComponent,
    RefreshIconComponent,
    SaveIconComponent,
    BookIconComponent,
    SchoolIconComponent,
    TimerIconComponent,
    CheckSquareIconComponent,
    ShuffleIconComponent,
    EyeOffIconComponent,
    LayersIconComponent,
    PercentIconComponent,
    SendIconComponent,
    TagIconComponent,
    RepeatIconComponent,
    SquareIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    FileTextIconComponent,
    InfoIconComponent,
    ListIconComponent,
    HashIconComponent,
    TypeIconComponent,
    AwardIconComponent,
    CheckCircleIconComponent,
    CircleIconComponent,
    XCircleIconComponent,
    MinusIconComponent
  ],
  templateUrl: './quiz-management.html',
  styleUrls: ['./quiz-management.scss']
})
export class QuizManagementComponent implements OnInit {
  quizService = inject(QuizManagementService);
  private router = inject(Router);

  // Signals for reactive state
  isLoading = signal(false);
  searchQuery = signal('');
  selectedStatus = signal<QuizStatus[]>([]);
  selectedCourse = signal<string>('');
  selectedEvaluationType = signal<EvaluationType[]>([]);
  showFilters = signal(false);
  selectedQuiz = signal<Quiz | null>(null);
  showCreateModal = signal(false);
  isCreating = signal(false);
  showViewQuestionsModal = signal(false);
  showModifyQuestionsModal = signal(false);
  
  // Create quiz form signals
  newQuizTitle = signal('');
  newQuizDescription = signal('');
  newQuizCourse = signal('');
  newQuizEvaluationType = signal<EvaluationType>(EvaluationType.MID_TERM);
  newQuizDuration = signal(60);
  newQuizPassingScore = signal(50);
  newQuizMaxAttempts = signal(1);
  newQuizShowResults = signal(true);
  newQuizShuffleQuestions = signal(false);
  newQuizShuffleOptions = signal(false);
  newQuizAllowReview = signal(true);
  newQuizStartDate = signal('');
  newQuizEndDate = signal('');
  newQuizInstructions = signal('');
  selectedClasses = signal<ClassOption[]>([]);
  
  // Question selection signals
  availableQuestions = signal<Question[]>([]);
  selectedQuestionsForQuiz = signal<Question[]>([]);
  questionFilter = signal<QuestionFilter>({
    search: '',
    type: '',
    difficulty: '',
    selectedOnly: false
  });
  showQuestionSelection = signal(false);
  
  // Modal step tracking
  currentStep = signal(1);
  totalSteps = 5; // Increased from 4 to 5 for question selection step
  
  // Computed properties
  filteredQuizzes = computed(() => {
    return this.quizService.filterQuizzes({
      status: this.selectedStatus(),
      courseId: this.selectedCourse(),
      evaluationType: this.selectedEvaluationType(),
      search: this.searchQuery()
    });
  });

  quizzes = computed(() => this.quizService.quizzes$());
  courses = computed(() => this.quizService.courses$());
  classes = computed(() => this.quizService.classes$());

  // Question type options
  questionTypeOptions = [
    { value: '', label: 'All Types' },
    { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
    { value: QuestionType.TRUE_FALSE, label: 'True/False' },
    { value: QuestionType.SHORT_ANSWER, label: 'Short Answer' },
    { value: QuestionType.ESSAY, label: 'Essay' },
    { value: QuestionType.MATCHING, label: 'Matching' },
    { value: QuestionType.FILL_BLANK, label: 'Fill in Blank' },
    { value: QuestionType.RATING_SCALE, label: 'Rating Scale' }
  ];

  // Difficulty options
  difficultyOptions = [
    { value: '', label: 'All Difficulties' },
    { value: DifficultyLevel.EASY, label: 'Easy' },
    { value: DifficultyLevel.MEDIUM, label: 'Medium' },
    { value: DifficultyLevel.HARD, label: 'Hard' }
  ];

  // Status options
  statusOptions: StatusOption[] = [
    { value: QuizStatus.DRAFT, label: 'Draft', color: this.getStatusColor(QuizStatus.DRAFT) },
    { value: QuizStatus.SCHEDULED, label: 'Scheduled', color: this.getStatusColor(QuizStatus.SCHEDULED) },
    { value: QuizStatus.ACTIVE, label: 'Active', color: this.getStatusColor(QuizStatus.ACTIVE) },
    { value: QuizStatus.CLOSED, label: 'Closed', color: this.getStatusColor(QuizStatus.CLOSED) },
    { value: QuizStatus.ARCHIVED, label: 'Archived', color: this.getStatusColor(QuizStatus.ARCHIVED) }
  ];

  // Evaluation type options
  evaluationTypeOptions: EvaluationTypeOption[] = [
    { value: EvaluationType.MID_TERM, label: 'Mid-Term', color: this.getEvaluationTypeColor(EvaluationType.MID_TERM) },
    { value: EvaluationType.END_OF_SEMESTER, label: 'End of Semester', color: this.getEvaluationTypeColor(EvaluationType.END_OF_SEMESTER) },
    { value: EvaluationType.FINAL_EXAM, label: 'Final Exam', color: this.getEvaluationTypeColor(EvaluationType.FINAL_EXAM) },
    { value: EvaluationType.PRACTICE, label: 'Practice', color: this.getEvaluationTypeColor(EvaluationType.PRACTICE) },
    { value: EvaluationType.ASSIGNMENT, label: 'Assignment', color: this.getEvaluationTypeColor(EvaluationType.ASSIGNMENT) }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize form dates
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    this.newQuizStartDate.set(today.toISOString().split('T')[0]);
    this.newQuizEndDate.set(nextWeek.toISOString().split('T')[0]);
    
    // Initialize classes selection
    this.initializeClasses();
  }

  /**
   * Initialize classes for selection
   */
  private initializeClasses(): void {
    const classes = this.classes().map(cls => ({
      id: cls.id,
      name: cls.name,
      selected: false
    }));
    this.selectedClasses.set(classes);
  }

  /**
   * Load available questions based on course selection
   */
  loadAvailableQuestions(): void {
    if (!this.newQuizCourse()) {
      this.availableQuestions.set([]);
      return;
    }

    this.quizService.getQuestionsByCourseAndLevel(this.newQuizCourse()).subscribe({
      next: (questions) => {
        this.availableQuestions.set(questions);
        // Filter out questions already selected
        this.updateSelectedQuestionsList();
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.availableQuestions.set([]);
      }
    });
  }

  /**
   * Update selected questions list
   */
  updateSelectedQuestionsList(): void {
    const selectedIds = this.selectedQuestionsForQuiz().map(q => q.id);
    this.availableQuestions.update(questions =>
      questions.filter(q => !selectedIds.includes(q.id))
    );
  }

  /**
   * Filter questions based on filter criteria
   */
  filteredQuestions(): Question[] {
    const filter = this.questionFilter();
    let questions = this.availableQuestions();

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      questions = questions.filter(q =>
        q.text.toLowerCase().includes(searchLower) ||
        q.topic?.toLowerCase().includes(searchLower) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filter.type) {
      questions = questions.filter(q => q.type === filter.type);
    }

    if (filter.difficulty) {
      questions = questions.filter(q => q.difficulty === filter.difficulty);
    }

    return questions;
  }

  /**
   * Toggle question selection
   */
  toggleQuestionSelection(question: Question): void {
    const current = this.selectedQuestionsForQuiz();
    const isSelected = current.some(q => q.id === question.id);

    if (isSelected) {
      this.selectedQuestionsForQuiz.set(current.filter(q => q.id !== question.id));
    } else {
      this.selectedQuestionsForQuiz.set([...current, question]);
    }

    this.updateSelectedQuestionsList();
  }

  /**
   * Check if question is selected
   */
  isQuestionSelected(questionId: string): boolean {
    return this.selectedQuestionsForQuiz().some(q => q.id === questionId);
  }

  /**
   * Select all filtered questions
   */
  selectAllFilteredQuestions(): void {
    const filtered = this.filteredQuestions();
    const currentIds = this.selectedQuestionsForQuiz().map(q => q.id);
    const newQuestions = filtered.filter(q => !currentIds.includes(q.id));
    
    this.selectedQuestionsForQuiz.update(current => [...current, ...newQuestions]);
    this.updateSelectedQuestionsList();
  }

  /**
   * Deselect all questions
   */
  deselectAllQuestions(): void {
    this.selectedQuestionsForQuiz.set([]);
    this.loadAvailableQuestions();
  }

  /**
   * Remove selected question
   */
  removeSelectedQuestion(questionId: string): void {
    this.selectedQuestionsForQuiz.update(questions =>
      questions.filter(q => q.id !== questionId)
    );
    this.loadAvailableQuestions();
  }

  /**
   * Get total points from selected questions
   */
  getSelectedQuestionsTotalPoints(): number {
    return this.selectedQuestionsForQuiz().reduce((total, q) => total + q.points, 0);
  }

  /**
   * Update question filter search
   */
  updateQuestionFilterSearch(value: string): void {
    this.questionFilter.update(filter => ({ ...filter, search: value }));
  }

  /**
   * Update question filter type
   */
  updateQuestionFilterType(value: QuestionType | ''): void {
    this.questionFilter.update(filter => ({ ...filter, type: value }));
  }

  /**
   * Update question filter difficulty
   */
  updateQuestionFilterDifficulty(value: DifficultyLevel | ''): void {
    this.questionFilter.update(filter => ({ ...filter, difficulty: value }));
  }

  /**
   * Get question types summary
   */
  getQuestionTypesSummary(): QuestionTypeSummary[] {
    const questionTypes = this.selectedQuestionsForQuiz().reduce((acc, question) => {
      const typeLabel = this.getQuestionTypeLabel(question.type);
      if (!acc[typeLabel]) {
        acc[typeLabel] = 0;
      }
      acc[typeLabel]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(questionTypes).map(([type, count]) => ({
      type,
      count
    }));
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Format date with time
   */
  formatDateTime(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format number with commas
   */
  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: QuizStatus): string {
    return this.quizService.getStatusColor(status);
  }

  /**
   * Get evaluation type badge color
   */
  getEvaluationTypeColor(type: EvaluationType): string {
    return this.quizService.getEvaluationTypeColor(type);
  }

  /**
   * Get question type label
   */
  getQuestionTypeLabel(type: QuestionType): string {
    return this.quizService.getQuestionTypeLabel(type);
  }

  /**
   * Get question type color
   */
  getQuestionTypeColor(type: QuestionType): string {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE: return '#3b82f6';
      case QuestionType.TRUE_FALSE: return '#10b981';
      case QuestionType.SHORT_ANSWER: return '#f59e0b';
      case QuestionType.ESSAY: return '#8b5cf6';
      case QuestionType.MATCHING: return '#ef4444';
      case QuestionType.FILL_BLANK: return '#ec4899';
      case QuestionType.RATING_SCALE: return '#06b6d4';
      default: return '#6b7280';
    }
  }

  /**
   * Get difficulty color
   */
  getDifficultyColor(difficulty: DifficultyLevel): string {
    return this.quizService.getDifficultyColor(difficulty);
  }

  /**
   * Toggle status filter
   */
  toggleStatus(status: QuizStatus): void {
    const current = this.selectedStatus();
    if (current.includes(status)) {
      this.selectedStatus.set(current.filter(s => s !== status));
    } else {
      this.selectedStatus.set([...current, status]);
    }
  }

  /**
   * Toggle evaluation type filter
   */
  toggleEvaluationType(type: EvaluationType): void {
    const current = this.selectedEvaluationType();
    if (current.includes(type)) {
      this.selectedEvaluationType.set(current.filter(t => t !== type));
    } else {
      this.selectedEvaluationType.set([...current, type]);
    }
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set([]);
    this.selectedCourse.set('');
    this.selectedEvaluationType.set([]);
  }

  /**
   * Open create quiz modal
   */
  openCreateModal(): void {
    this.showCreateModal.set(true);
    this.currentStep.set(1);
    this.resetForm();
  }

  /**
   * Close create quiz modal
   */
  closeCreateModal(): void {
    this.showCreateModal.set(false);
    this.currentStep.set(1);
    this.resetForm();
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    this.newQuizTitle.set('');
    this.newQuizDescription.set('');
    this.newQuizCourse.set('');
    this.newQuizEvaluationType.set(EvaluationType.MID_TERM);
    this.newQuizDuration.set(60);
    this.newQuizPassingScore.set(50);
    this.newQuizMaxAttempts.set(1);
    this.newQuizShowResults.set(true);
    this.newQuizShuffleQuestions.set(false);
    this.newQuizShuffleOptions.set(false);
    this.newQuizAllowReview.set(true);
    this.newQuizStartDate.set(today.toISOString().split('T')[0]);
    this.newQuizEndDate.set(nextWeek.toISOString().split('T')[0]);
    this.newQuizInstructions.set('');
    this.selectedQuestionsForQuiz.set([]);
    this.availableQuestions.set([]);
    this.questionFilter.set({
      search: '',
      type: '',
      difficulty: '',
      selectedOnly: false
    });
    
    // Reset class selections
    this.selectedClasses.update(classes => 
      classes.map(cls => ({ ...cls, selected: false }))
    );
  }

  /**
   * Go to next step in modal
   */
  nextStep(): void {
    if (this.currentStep() === 3 && this.newQuizCourse()) {
      // When moving from step 3 to 4, load questions for the selected course
      this.loadAvailableQuestions();
    }
    
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  /**
   * Go to previous step in modal
   */
  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  /**
   * Toggle class selection
   */
  toggleClassSelection(classId: string): void {
    this.selectedClasses.update(classes => 
      classes.map(cls => 
        cls.id === classId ? { ...cls, selected: !cls.selected } : cls
      )
    );
  }

  /**
   * Select all classes
   */
  selectAllClasses(): void {
    this.selectedClasses.update(classes => 
      classes.map(cls => ({ ...cls, selected: true }))
    );
  }

  /**
   * Deselect all classes
   */
  deselectAllClasses(): void {
    this.selectedClasses.update(classes => 
      classes.map(cls => ({ ...cls, selected: false }))
    );
  }

  /**
   * Get selected class IDs
   */
  getSelectedClassIds(): string[] {
    return this.selectedClasses()
      .filter(cls => cls.selected)
      .map(cls => cls.id);
  }

  /**
   * Create new quiz from form
   */
  createQuiz(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields and select at least one question');
      return;
    }

    this.isCreating.set(true);
    
    const quizData: Partial<Quiz> = {
      title: this.newQuizTitle(),
      description: this.newQuizDescription(),
      courseId: this.newQuizCourse(),
      evaluationType: this.newQuizEvaluationType(),
      duration: this.newQuizDuration(),
      passingScore: this.newQuizPassingScore(),
      maxAttempts: this.newQuizMaxAttempts(),
      showResults: this.newQuizShowResults(),
      shuffleQuestions: this.newQuizShuffleQuestions(),
      shuffleOptions: this.newQuizShuffleOptions(),
      allowReview: this.newQuizAllowReview(),
      startDate: new Date(this.newQuizStartDate()),
      endDate: new Date(this.newQuizEndDate()),
      instructions: this.newQuizInstructions(),
      accessibleClassIds: this.getSelectedClassIds(),
      questionIds: this.selectedQuestionsForQuiz().map(q => q.id),
      status: QuizStatus.DRAFT,
      isPublished: false,
      academicYearId: '2024',
      totalQuestions: this.selectedQuestionsForQuiz().length,
      totalPoints: this.getSelectedQuestionsTotalPoints(),
      totalAttempts: 0
    };

    this.quizService.createQuiz(quizData).subscribe({
      next: (createdQuiz) => {
        this.isCreating.set(false);
        this.closeCreateModal();
        
        // Navigate to edit page for further configuration
        this.router.navigate(['/quiz-management/edit', createdQuiz.id], {
          queryParams: { step: 'questions' }
        });
      },
      error: (error) => {
        this.isCreating.set(false);
        console.error('Error creating quiz:', error);
        alert('Failed to create quiz. Please try again.');
      }
    });
  }

  /**
   * Validate form
   */
  public isFormValid(): boolean {
    return !!this.newQuizTitle().trim() && 
           !!this.newQuizCourse() &&
           !!this.newQuizStartDate() &&
           !!this.newQuizEndDate() &&
           this.getSelectedClassIds().length > 0 &&
           this.selectedQuestionsForQuiz().length > 0;
  }

  /**
   * Edit quiz
   */
  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/quiz-management/edit', quiz.id]);
  }

  /**
   * View quiz questions
   */
  viewQuizQuestions(quiz: Quiz): void {
    this.selectedQuiz.set(quiz);
    this.showViewQuestionsModal.set(true);
  }

  /**
   * Modify quiz questions
   */
  modifyQuizQuestions(quiz: Quiz): void {
    this.selectedQuiz.set(quiz);
    // Load selected questions
    const quizQuestions = this.quizService.getQuizQuestions(quiz.id);
    this.selectedQuestionsForQuiz.set(quizQuestions);
    
    // Load available questions for the quiz's course
    if (quiz.courseId) {
      this.newQuizCourse.set(quiz.courseId);
      this.loadAvailableQuestions();
    }
    
    this.showModifyQuestionsModal.set(true);
  }

  /**
   * Close view questions modal
   */
  closeViewQuestionsModal(): void {
    this.showViewQuestionsModal.set(false);
    this.selectedQuiz.set(null);
  }

  /**
   * Close modify questions modal
   */
  closeModifyQuestionsModal(): void {
    this.showModifyQuestionsModal.set(false);
    this.selectedQuiz.set(null);
    this.selectedQuestionsForQuiz.set([]);
  }

  /**
   * Update quiz questions
   */
  updateQuizQuestions(): void {
    const quiz = this.selectedQuiz();
    if (!quiz) return;

    this.isLoading.set(true);
    const questionIds = this.selectedQuestionsForQuiz().map(q => q.id);
    
    this.quizService.updateQuiz(quiz.id, {
      questionIds: questionIds,
      totalQuestions: questionIds.length,
      totalPoints: this.getSelectedQuestionsTotalPoints()
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.closeModifyQuestionsModal();
        // Show success message
        alert('Quiz questions updated successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error updating quiz questions:', error);
        alert('Failed to update quiz questions. Please try again.');
      }
    });
  }

  /**
   * Delete quiz
   */
  deleteQuiz(quiz: Quiz): void {
    if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      this.isLoading.set(true);
      this.quizService.deleteQuiz(quiz.id).subscribe({
        next: () => {
          this.isLoading.set(false);
          // Show success message
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error deleting quiz:', error);
          // Show error message
        }
      });
    }
  }

  /**
   * Duplicate quiz
   */
  duplicateQuiz(quiz: Quiz): void {
    this.isLoading.set(true);
    this.quizService.duplicateQuiz(quiz.id).subscribe({
      next: (duplicatedQuiz) => {
        this.isLoading.set(false);
        // Show success message
        console.log('Quiz duplicated:', duplicatedQuiz);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error duplicating quiz:', error);
        // Show error message
      }
    });
  }

  /**
   * Publish quiz
   */
  publishQuiz(quiz: Quiz): void {
    if (quiz.status === QuizStatus.DRAFT) {
      this.isLoading.set(true);
      this.quizService.publishQuiz(quiz.id).subscribe({
        next: () => {
          this.isLoading.set(false);
          // Show success message
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error publishing quiz:', error);
          // Show error message
        }
      });
    }
  }

  /**
   * View quiz responses
   */
  viewResponses(quiz: Quiz): void {
    this.router.navigate(['/response-viewing'], { 
      queryParams: { quizId: quiz.id } 
    });
  }

  /**
   * Export quiz data
   */
  exportQuizData(quiz: Quiz): void {
    // Implement export logic
    console.log('Export quiz data:', quiz);
  }

  /**
   * Get course name by ID
   */
  getCourseName(courseId: string): string {
    const course = this.courses().find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  }

  /**
   * Get quiz questions count
   */
  getQuizQuestionsCount(quiz: Quiz): number {
    return quiz.totalQuestions || 0;
  }

  /**
   * Toggle filter panel
   */
  toggleFilters(): void {
    this.showFilters.set(!this.showFilters());
  }

  /**
   * Refresh data
   */
  refreshData(): void {
    this.isLoading.set(true);
    this.quizService.loadQuizzes();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Get filtered count
   */
  getFilteredCount(): number {
    return this.filteredQuizzes().length;
  }

  /**
   * Get total count
   */
  getTotalCount(): number {
    return this.quizzes().length;
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return (
      this.searchQuery().length > 0 ||
      this.selectedStatus().length > 0 ||
      this.selectedCourse().length > 0 ||
      this.selectedEvaluationType().length > 0
    );
  }

  /**
   * Calculate total attempts from filtered quizzes
   */
  getTotalAttempts(): number {
    return this.filteredQuizzes().reduce((sum, q) => sum + q.totalAttempts, 0);
  }

  /**
   * Calculate average score from filtered quizzes
   */
  getAverageScore(): string {
    const filtered = this.filteredQuizzes();
    if (filtered.length === 0) return '0';
    
    const total = filtered.reduce((sum, q) => sum + (q.averageScore || 0), 0);
    return (total / filtered.length).toFixed(1);
  }

  /**
   * Get active quizzes count
   */
  getActiveQuizzesCount(): number {
    return this.filteredQuizzes().filter(q => q.status === QuizStatus.ACTIVE).length;
  }
}