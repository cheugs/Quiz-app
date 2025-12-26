import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResponseViewingService } from './../../core/services/response-viewing';
import { 
  QuizResponse, 
  ResponseStatus, 
  QuestionAnswer 
} from '../../models/response.model';
import { Quiz } from '../../models/quiz.model';
import { QuestionType } from '../../models/question.model';
import { SentimentAnalysis } from '../../models/sentiment-analysis.model';

// Import icon components
import {
  BarChartIconComponent,
  SearchIconComponent,
  FilterIconComponent,
  DownloadIconComponent,
  RefreshIconComponent,
  EyeIconComponent,
  CalendarIconComponent,
  ClockIconComponent,
  AwardIconComponent,
  UsersIconComponent,
  CheckCircleIconComponent,
  XCircleIconComponent,
  AlertCircleIconComponent,
  InfoIconComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  ChevronLeftIconComponent,
  ChevronRightIconComponent,
  XIconComponent,
  TrendingUpIconComponent,
  TrendingDownIconComponent,
  MessageSquareIconComponent,
  FileTextIconComponent,
  HashIconComponent,
  TypeIconComponent,
  TagIconComponent,
  BookIconComponent,
  SchoolIconComponent,
  TimerIconComponent,
  ActivityIconComponent,
  ListIconComponent,
  MoreIconComponent,
  CopyIconComponent,
  ExternalLinkIconComponent,
  CheckIconComponent,
  CircleIconComponent,
} from '../../../assets/icon-dashboard';

interface ResponseFilter {
  quizId: string;
  status: ResponseStatus[];
  dateRange?: { start: Date; end: Date };
  search: string;
  hasSentiment?: boolean;
}

interface StatusOption {
  value: ResponseStatus;
  label: string;
  color: string;
}

@Component({
  selector: 'app-response-viewing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Icon components
    BarChartIconComponent,
    SearchIconComponent,
    FilterIconComponent,
    DownloadIconComponent,
    RefreshIconComponent,
    EyeIconComponent,
    CalendarIconComponent,
    ClockIconComponent,
    AwardIconComponent,
    UsersIconComponent,
    CheckCircleIconComponent,
    XCircleIconComponent,
    AlertCircleIconComponent,
    InfoIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    XIconComponent,
    TrendingUpIconComponent,
    TrendingDownIconComponent,
    MessageSquareIconComponent,
    FileTextIconComponent,
    HashIconComponent,
    TypeIconComponent,
    TagIconComponent,
    BookIconComponent,
    SchoolIconComponent,
    TimerIconComponent,
    ActivityIconComponent,
    ListIconComponent,
    MoreIconComponent,
    CopyIconComponent,
    ExternalLinkIconComponent,
    CheckIconComponent,
    CircleIconComponent
  ],
  templateUrl: './response-viewing.html',
  styleUrls: ['./response-viewing.scss']
})
export class ResponseViewingComponent implements OnInit {
  private responseService = inject(ResponseViewingService);

  // Signals for reactive state
  isLoading = signal(false);
  searchQuery = signal('');
  selectedQuiz = signal<string>('');
  selectedStatus = signal<ResponseStatus[]>([]);
  showFilters = signal(false);
  showResponseDetail = signal(false);
  showSentimentDetail = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  
  
  // Date range
  dateRange = signal<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  // Computed properties
  responses = computed(() => this.responseService.responses$());
  quizzes = computed(() => this.responseService.quizzes$());
  selectedResponse = computed(() => this.responseService.selectedResponse$());
  sentimentAnalysis = computed(() => 
    this.selectedResponse() ? 
    this.responseService.getSentimentAnalysis(this.selectedResponse()!.id) : 
    null
  );

  // Add this getter to expose the enum
readonly ResponseStatus = ResponseStatus;
readonly responses$ = computed(() => this.responses());

  // Filtered responses
  filteredResponses = computed(() => {
    return this.responseService.filterResponses({
      quizId: this.selectedQuiz(),
      status: this.selectedStatus(),
      search: this.searchQuery(),
      dateRange: this.dateRange().start && this.dateRange().end ? {
        start: this.dateRange().start!,
        end: this.dateRange().end!
      } : undefined
    });
  });

  // Paginated responses
  paginatedResponses = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredResponses().slice(startIndex, endIndex);
  });

  // Total pages
  totalPages = computed(() => 
    Math.ceil(this.filteredResponses().length / this.pageSize())
  );

  // Statistics
  stats = computed(() => 
    this.responseService.getResponseStats(this.selectedQuiz())
  );

  // Status options
  statusOptions: StatusOption[] = [
    { value: ResponseStatus.GRADED, label: 'Graded', color: this.getStatusColor(ResponseStatus.GRADED) },
    { value: ResponseStatus.SUBMITTED, label: 'Submitted', color: this.getStatusColor(ResponseStatus.SUBMITTED) },
    { value: ResponseStatus.IN_PROGRESS, label: 'In Progress', color: this.getStatusColor(ResponseStatus.IN_PROGRESS) },
    { value: ResponseStatus.OVERDUE, label: 'Overdue', color: this.getStatusColor(ResponseStatus.OVERDUE) },
    { value: ResponseStatus.INVALID, label: 'Invalid', color: this.getStatusColor(ResponseStatus.INVALID) }
  ];

  constructor() {}

  ngOnInit(): void {
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    this.dateRange.set({
      start: startDate,
      end: endDate
    });
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format time spent
   */
  formatTimeSpent(seconds: number): string {
    return this.responseService.formatTimeSpent(seconds);
  }

  /**
   * Get status badge color
   */

// Update getStatusColor to be more flexible
getStatusColor(status: ResponseStatus | string): string {
  // Convert string to ResponseStatus if needed
  const statusEnum = Object.values(ResponseStatus).includes(status as ResponseStatus) 
    ? status as ResponseStatus 
    : ResponseStatus.GRADED;
  
  return this.responseService.getStatusColor(statusEnum);
}

  /**
   * Get sentiment color
   */
/**
 * Get sentiment color - updated to handle undefined
 */
getSentimentColor(sentiment?: string | null): string {
  if (!sentiment) return '#6b7280'; // Default gray color
  return this.responseService.getSentimentColor(sentiment);
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
   * Toggle status filter
   */
  toggleStatus(status: ResponseStatus): void {
    const current = this.selectedStatus();
    if (current.includes(status)) {
      this.selectedStatus.set(current.filter(s => s !== status));
    } else {
      this.selectedStatus.set([...current, status]);
    }
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedQuiz.set('');
    this.selectedStatus.set([]);
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    this.dateRange.set({
      start: startDate,
      end: endDate
    });
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return (
      this.searchQuery().length > 0 ||
      this.selectedQuiz().length > 0 ||
      this.selectedStatus().length > 0 ||
      (this.dateRange().start && this.dateRange().end ? 
        this.dateRange().start!.getTime() !== new Date().setDate(new Date().getDate() - 30) : 
        false)
    );
  }

  /**
   * View response details
   */
  viewResponse(response: QuizResponse): void {
    this.responseService.selectResponse(response);
    this.showResponseDetail.set(true);
  }

  /**
   * Close response detail modal
   */
  closeResponseDetail(): void {
    this.showResponseDetail.set(false);
    this.responseService.selectResponse(null);
  }

  /**
   * View sentiment analysis
   */
  viewSentimentAnalysis(): void {
    this.showSentimentDetail.set(true);
  }

  /**
   * Close sentiment analysis modal
   */
  closeSentimentDetail(): void {
    this.showSentimentDetail.set(false);
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
    // In a real app, this would reload from the API
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Export responses
   */
  exportResponses(): void {
    this.isLoading.set(true);
    this.responseService.exportResponses(this.selectedQuiz()).subscribe({
      next: (result) => {
        this.isLoading.set(false);
        console.log('Export successful:', result);
        // Show success notification
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Export failed:', error);
        // Show error notification
      }
    });
  }

  /**
   * Get quiz name by ID
   */
  getQuizName(quizId: string): string {
    const quiz = this.quizzes().find(q => q.id === quizId);
    return quiz ? quiz.title : 'Unknown Quiz';
  }

  /**
   * Go to next page
   */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  /**
   * Go to previous page
   */
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  /**
   * Go to specific page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  /**
   * Get page numbers for pagination
   */
  getPageNumbers(): number[] {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];
    
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (current >= total - 2) {
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        for (let i = current - 2; i <= current + 2; i++) pages.push(i);
      }
    }
    
    return pages;
  }

  /**
   * Get correct answer percentage for a response
   */
  getCorrectPercentage(response: QuizResponse): number {
    if (!response.answers || response.answers.length === 0) return 0;
    
    const correctAnswers = response.answers.filter(a => a.isCorrect).length;
    return (correctAnswers / response.answers.length) * 100;
  }

  /**
   * Get average time per question
   */
  getAverageTimePerQuestion(response: QuizResponse): number {
    if (!response.answers || response.answers.length === 0) return 0;
    
    const totalTime = response.answers.reduce((sum, a) => sum + a.timeSpent, 0);
    return totalTime / response.answers.length;
  }

  /**
   * Helper method to update date range
   */
  updateDateRange(type: 'start' | 'end', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const currentRange = this.dateRange();
    
    this.dateRange.set({
      ...currentRange,
      [type]: value ? new Date(value) : null
    });
  }

  /**
   * Helper to get safe date
   */
  getSafeDate(date: Date | string | undefined | null): Date {
    if (!date) return new Date();
    return new Date(date);
  }

  /**
   * Get formatted date for input value
   */
  getDateForInput(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }
  
}