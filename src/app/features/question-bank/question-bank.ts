import { Component, OnInit, inject, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { QuestionBankService } from './../../core/services/question-bank';
import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';
import { Question, QuestionType, DifficultyLevel, QuestionBankFilter, QuestionOption } from '../../models/question.model';
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import icon components
import { 
  SearchIconComponent, 
  FilterIconComponent, 
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  MoreIconComponent,
  UploadIconComponent,
  DownloadIconComponent,
  AddIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  CheckIconComponent,
  XIconComponent,
  RefreshIconComponent,
  EyeIconComponent,
  QuizIconComponent,
  UsersIconComponent,
  CalendarIconComponent,
  GridIconComponent,
  ClockIconComponent,
  FileTextIconComponent,
  InfoIconComponent,
  AlertCircleIconComponent,
  CheckCircleIconComponent,
  SaveIconComponent,
  PlusIconComponent,
  MinusIconComponent,
  Trash2IconComponent,
  CopyIconComponent,
  ImageIconComponent,
  MaximizeIconComponent,
  MinimizeIconComponent
} from '../../../assets/icon-dashboard';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, // Add this for formGroup support
    RouterModule,
    // Icon components - include only the ones you're using
    SearchIconComponent,
    FilterIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    MoreIconComponent,
    UploadIconComponent,
    DownloadIconComponent,
    AddIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    CheckIconComponent,
    XIconComponent,
    RefreshIconComponent,
    EyeIconComponent,
    QuizIconComponent,
    UsersIconComponent,
    CalendarIconComponent,
    GridIconComponent,
    ClockIconComponent,
    FileTextIconComponent,
    InfoIconComponent,
    AlertCircleIconComponent,
    CheckCircleIconComponent,
    SaveIconComponent,
    PlusIconComponent,
    MinusIconComponent,
    Trash2IconComponent,
    CopyIconComponent,
    ImageIconComponent,
    MaximizeIconComponent,
    MinimizeIconComponent
  ],
  templateUrl: './question-bank.html',
  styleUrls: ['./question-bank.scss']
})
export class QuestionBankComponent implements OnInit {
  private questionBankService = inject(QuestionBankService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('importFileInput') importFileInput!: ElementRef;
  
  // Signals from service
  questions = computed(() => this.questionBankService.questions$());
  courses = computed(() => this.questionBankService.courses$());
  isLoading = computed(() => this.questionBankService.isLoading$());
  totalQuestions = computed(() => this.questionBankService.totalQuestions$());
  selectedFilters = computed(() => this.questionBankService.selectedFilters$());
  
  // Local signals
  isEditModalOpen = signal(false);
  isCreateModalOpen = signal(false);
  isFullscreen = signal(false);
  questionForm!: FormGroup;
  questionOptions = signal<QuestionOption[]>([
    { id: '1', text: '', isCorrect: false, order: 1 },
    { id: '2', text: '', isCorrect: false, order: 2 }
  ]);
  currentOptionId = signal(3);
  
  currentUser = signal<User | null>(null);
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  showFilters = signal(false);
  selectedQuestion = signal<Question | null>(null);
  isDeleteModalOpen = signal(false);
  isImportModalOpen = signal(false);
  isBulkDeleteModalOpen = signal(false);
  isExportModalOpen = signal(false);
  isStatisticsModalOpen = signal(false);
  importFile = signal<File | null>(null);
  importProgress = signal(0);
  isExporting = signal(false);
  selectedQuestions = signal<Set<string>>(new Set());
  exportFormat = signal<'excel' | 'csv'>('excel');
  showAdditionalInfo = signal(false);
  
  // Computed values
  filteredQuestions = computed(() => {
    const questions = this.questions();
    const search = this.searchTerm().toLowerCase();
    
    if (!search) return questions;
    
    return questions.filter(q => 
      q.text.toLowerCase().includes(search) ||
      q.topic?.toLowerCase().includes(search) ||
      q.tags.some(tag => tag.toLowerCase().includes(search))
    );
  });
  
  totalPages = computed(() => {
    const total = this.totalQuestions();
    const perPage = this.itemsPerPage();
    return Math.ceil(total / perPage);
  });
  
  hasSelectedQuestions = computed(() => this.selectedQuestions().size > 0);
  
  // Get enums from service
  questionTypes = Object.values(QuestionType);
  difficultyLevels = Object.values(DifficultyLevel);
  
  // Filter form model
  filterModel = {
    search: '',
    courseIds: [] as string[],
    questionTypes: [] as QuestionType[],
    difficultyLevels: [] as DifficultyLevel[],
    tags: [] as string[],
    usedInQuiz: undefined as boolean | undefined
  };

  // Statistics data
  statistics = signal({
    totalQuestions: 0,
    byType: [] as Array<{type: string, count: number, percentage: number}>,
    byDifficulty: [] as Array<{difficulty: string, count: number, percentage: number}>,
    byCourse: [] as Array<{course: string, count: number, percentage: number}>,
    unusedQuestions: 0,
    mostUsedQuestion: { id: '', text: '', usageCount: 0 }
  });

  constructor() {
    this.initQuestionForm();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.questionBankService.loadInitialData();
    this.loadStatistics();
  }

  initQuestionForm(): void {
    this.questionForm = this.fb.group({
      id: [''],
      text: ['', [Validators.required, Validators.minLength(5)]],
      type: [QuestionType.MULTIPLE_CHOICE, Validators.required],
      courseId: ['', Validators.required],
      topic: [''],
      points: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
      difficulty: [DifficultyLevel.MEDIUM, Validators.required],
      tags: [''],
      explanation: [''],
      correctAnswer: [''],
      // For rating scale
      ratingScaleMin: [1],
      ratingScaleMax: [5],
      ratingScaleLabels: [''],
      // For matching
      matchingPairs: [''],
      // For fill blank
      blankAnswers: ['']
    });
  }
  
  loadUserData(): void {
    this.currentUser.set(this.authService.getCurrentUser());
  }

  loadStatistics(): void {
    const questions = this.questions();
    if (questions.length === 0) return;

    const total = questions.length;
    const typeCounts = new Map<string, number>();
    const difficultyCounts = new Map<DifficultyLevel, number>();
    const courseCounts = new Map<string, number>();
    let unusedCount = 0;
    let mostUsed = questions[0];

    questions.forEach(q => {
      // Count by type
      typeCounts.set(q.type, (typeCounts.get(q.type) || 0) + 1);
      
      // Count by difficulty
      difficultyCounts.set(q.difficulty, (difficultyCounts.get(q.difficulty) || 0) + 1);
      
      // Count by course
      courseCounts.set(this.getCourseName(q.courseId), (courseCounts.get(this.getCourseName(q.courseId)) || 0) + 1);
      
      // Count unused
      if (q.usageCount === 0) unusedCount++;
      
      // Find most used
      if (q.usageCount > mostUsed.usageCount) mostUsed = q;
    });

    this.statistics.set({
      totalQuestions: total,
      byType: Array.from(typeCounts.entries()).map(([type, count]) => ({
        type: this.getQuestionTypeDisplay(type as QuestionType),
        count,
        percentage: (count / total) * 100
      })),
      byDifficulty: Array.from(difficultyCounts.entries()).map(([difficulty, count]) => ({
        difficulty: this.getCapitalizedDifficulty(difficulty),
        count,
        percentage: (count / total) * 100
      })),
      byCourse: Array.from(courseCounts.entries()).map(([course, count]) => ({
        course,
        count,
        percentage: (count / total) * 100
      })),
      unusedQuestions: unusedCount,
      mostUsedQuestion: {
        id: mostUsed.id,
        text: this.getTruncatedText(mostUsed.text, 50),
        usageCount: mostUsed.usageCount
      }
    });
  }

  // =============== MODAL METHODS ===============
  
  openEditModal(question: Question): void {
    this.selectedQuestion.set(question);
    this.patchQuestionForm(question);
    this.isEditModalOpen.set(true);
  }

  openCreateModal(): void {
    this.questionForm.reset({
      type: QuestionType.MULTIPLE_CHOICE,
      points: 10,
      difficulty: DifficultyLevel.MEDIUM,
      ratingScaleMin: 1,
      ratingScaleMax: 5
    });
    this.questionOptions.set([
      { id: '1', text: '', isCorrect: false, order: 1 },
      { id: '2', text: '', isCorrect: false, order: 2 }
    ]);
    this.currentOptionId.set(3);
    this.isCreateModalOpen.set(true);
  }

  patchQuestionForm(question: Question): void {
    this.questionForm.patchValue({
      id: question.id,
      text: question.text,
      type: question.type,
      courseId: question.courseId,
      topic: question.topic || '',
      points: question.points,
      difficulty: question.difficulty,
      tags: question.tags.join(', '),
      explanation: question.explanation || '',
      correctAnswer: question.correctAnswer || ''
    });

    // Set options if available
    if (question.options && question.options.length > 0) {
      this.questionOptions.set([...question.options]);
      this.currentOptionId.set(Math.max(...question.options.map(o => parseInt(o.id))) + 1);
    } else {
      this.questionOptions.set([
        { id: '1', text: '', isCorrect: false, order: 1 },
        { id: '2', text: '', isCorrect: false, order: 2 }
      ]);
      this.currentOptionId.set(3);
    }
  }

  addOption(): void {
    const newOption: QuestionOption = {
      id: this.currentOptionId().toString(),
      text: '',
      isCorrect: false,
      order: this.questionOptions().length + 1
    };
    this.questionOptions.update(options => [...options, newOption]);
    this.currentOptionId.update(id => id + 1);
  }

  removeOption(optionId: string): void {
    if (this.questionOptions().length <= 2) {
      this.notificationService.showWarning('Question must have at least 2 options');
      return;
    }
    this.questionOptions.update(options => options.filter(opt => opt.id !== optionId));
    // Reorder options
    this.reorderOptions();
  }

  reorderOptions(): void {
    const reordered = this.questionOptions().map((option, index) => ({
      ...option,
      order: index + 1
    }));
    this.questionOptions.set(reordered);
  }

  toggleCorrectOption(optionId: string): void {
    const questionType = this.questionForm.get('type')?.value;
    
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      // For multiple choice, allow multiple correct answers
      this.questionOptions.update(options => 
        options.map(opt => 
          opt.id === optionId ? { ...opt, isCorrect: !opt.isCorrect } : opt
        )
      );
    } else if (questionType === QuestionType.TRUE_FALSE) {
      // For true/false, only one can be correct
      this.questionOptions.update(options => 
        options.map(opt => ({
          ...opt,
          isCorrect: opt.id === optionId
        }))
      );
    }
  }

  saveQuestion(): void {
    if (this.questionForm.invalid) {
      this.markFormGroupTouched(this.questionForm);
      this.notificationService.showError('Please fill all required fields');
      return;
    }

    const formValue = this.questionForm.value;
    const questionData: Partial<Question> = {
      text: formValue.text,
      type: formValue.type,
      courseId: formValue.courseId,
      topic: formValue.topic || undefined,
      points: formValue.points,
      difficulty: formValue.difficulty,
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
      explanation: formValue.explanation || undefined,
      correctAnswer: formValue.correctAnswer || undefined
    };

    // Add options for MCQ and True/False
    if (formValue.type === QuestionType.MULTIPLE_CHOICE || formValue.type === QuestionType.TRUE_FALSE) {
      questionData.options = this.questionOptions();
      questionData.correctOptionIds = this.questionOptions()
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);
    }

    if (formValue.id) {
      // Update existing question
      this.questionBankService.updateQuestion(formValue.id, questionData).subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('Question updated successfully');
            this.questionBankService.loadQuestions(this.currentPage(), this.itemsPerPage());
            this.loadStatistics();
            this.isEditModalOpen.set(false);
          } else {
            this.notificationService.showError(response.message || 'Failed to update question');
          }
        },
        error: (error) => {
          this.notificationService.showError('Failed to update question');
        }
      });
    } else {
      // Create new question
      this.questionBankService.createQuestion(questionData).subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('Question created successfully');
            this.questionBankService.loadQuestions(this.currentPage(), this.itemsPerPage());
            this.loadStatistics();
            this.isCreateModalOpen.set(false);
          } else {
            this.notificationService.showError(response.message || 'Failed to create question');
          }
        },
        error: (error) => {
          this.notificationService.showError('Failed to create question');
        }
      });
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  toggleFullscreen(): void {
    this.isFullscreen.update(value => !value);
  }

  getFormFieldError(fieldName: string): string {
    const field = this.questionForm.get(fieldName);
    if (!field?.errors || !field.touched) return '';
    
    if (field.errors['required']) return 'This field is required';
    if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
    if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
    
    return 'Invalid value';
  }

  getQuestionTypeOptions(): Array<{value: QuestionType, label: string, description: string}> {
    return [
      { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice', description: 'Choose one or more correct answers' },
      { value: QuestionType.TRUE_FALSE, label: 'True/False', description: 'Select true or false' },
      { value: QuestionType.SHORT_ANSWER, label: 'Short Answer', description: 'Brief text response' },
      { value: QuestionType.ESSAY, label: 'Essay', description: 'Long form written response' },
      { value: QuestionType.MATCHING, label: 'Matching', description: 'Match items from two columns' },
      { value: QuestionType.FILL_BLANK, label: 'Fill in Blank', description: 'Complete missing words' },
      { value: QuestionType.RATING_SCALE, label: 'Rating Scale', description: 'Rate on a numerical scale' }
    ];
  }

  getCurrentQuestionTypeDescription(): string {
    const currentType = this.questionForm.get('type')?.value;
    const option = this.getQuestionTypeOptions().find(t => t.value === currentType);
    return option?.description || '';
  }

  toggleAdditionalInfo(): void {
    this.showAdditionalInfo.update(value => !value);
  }

  // =============== FILTER METHODS ===============
  
  applyFilters(): void {
    const filters: QuestionBankFilter = {
      search: this.filterModel.search || undefined,
      courseIds: this.filterModel.courseIds.length > 0 ? this.filterModel.courseIds : undefined,
      questionTypes: this.filterModel.questionTypes.length > 0 ? this.filterModel.questionTypes : undefined,
      difficultyLevels: this.filterModel.difficultyLevels.length > 0 ? this.filterModel.difficultyLevels : undefined,
      tags: this.filterModel.tags.length > 0 ? this.filterModel.tags : undefined,
      usedInQuiz: this.filterModel.usedInQuiz
    };
    
    this.questionBankService.applyFilters(filters);
    this.showFilters.set(false);
  }

  clearFilters(): void {
    this.filterModel = {
      search: '',
      courseIds: [],
      questionTypes: [],
      difficultyLevels: [],
      tags: [],
      usedInQuiz: undefined
    };
    this.questionBankService.clearFilters();
    this.searchTerm.set('');
  }

  toggleFilters(): void {
    this.showFilters.update(value => !value);
  }

  onSearch(): void {
    this.filterModel.search = this.searchTerm();
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.filterModel.search = '';
    this.applyFilters();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.questionBankService.loadQuestions(page, this.itemsPerPage());
    }
  }

  // =============== QUESTION METHODS ===============
  
  getQuestionTypeDisplay(type: QuestionType): string {
    return this.questionBankService.getQuestionTypeDisplay(type);
  }

  getDifficultyColor(difficulty: DifficultyLevel): string {
    return this.questionBankService.getDifficultyColor(difficulty);
  }

  formatDate(date: Date): string {
    return this.questionBankService.formatDate(date);
  }

  previewQuestion(question: Question): void {
    this.selectedQuestion.set(question);
  }

  closePreview(): void {
    this.selectedQuestion.set(null);
  }

  confirmDelete(question: Question): void {
    this.selectedQuestion.set(question);
    this.isDeleteModalOpen.set(true);
  }

  deleteQuestion(): void {
    const question = this.selectedQuestion();
    if (!question) return;

    this.questionBankService.deleteQuestion(question.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Question deleted successfully');
          this.questionBankService.loadQuestions(this.currentPage(), this.itemsPerPage());
          this.loadStatistics();
        } else {
          this.notificationService.showError(response.message || 'Failed to delete question');
        }
        this.isDeleteModalOpen.set(false);
        this.selectedQuestion.set(null);
      },
      error: (error) => {
        this.notificationService.showError('Failed to delete question');
        this.isDeleteModalOpen.set(false);
        this.selectedQuestion.set(null);
      }
    });
  }

  duplicateQuestion(question: Question): void {
    this.questionBankService.duplicateQuestion(question.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Question duplicated successfully');
          this.questionBankService.loadQuestions(this.currentPage(), this.itemsPerPage());
          this.loadStatistics();
        } else {
          this.notificationService.showError(response.message || 'Failed to duplicate question');
        }
      },
      error: (error) => {
        this.notificationService.showError('Failed to duplicate question');
      }
    });
  }

  downloadTemplate(): void {
    const link = document.createElement('a');
    link.href = '/assets/templates/questions-template.xlsx';
    link.download = 'questions-template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.notificationService.showSuccess('Template downloaded successfully');
  }

  openImportModal(): void {
    this.isImportModalOpen.set(true);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFile.set(file);
    }
  }

  importQuestions(): void {
    const file = this.importFile();
    if (!file) {
      this.notificationService.showWarning('Please select a file to import');
      return;
    }

    this.importProgress.set(10);
    
    // Simulate import progress
    const progressInterval = setInterval(() => {
      this.importProgress.update(progress => {
        const newProgress = progress + Math.random() * 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);

    this.questionBankService.importQuestions(file).subscribe({
      next: (response) => {
        clearInterval(progressInterval);
        this.importProgress.set(100);
        
        setTimeout(() => {
          if (response.success && response.data) {
            const { imported, failed } = response.data;
            this.notificationService.showSuccess(
              `Import completed: ${imported} questions imported${failed > 0 ? `, ${failed} failed` : ''}`
            );
            this.questionBankService.loadQuestions();
            this.loadStatistics();
          } else {
            this.notificationService.showError(response.message || 'Import failed');
          }
          this.isImportModalOpen.set(false);
          this.importFile.set(null);
          this.importProgress.set(0);
          if (this.importFileInput) {
            this.importFileInput.nativeElement.value = '';
          }
        }, 500);
      },
      error: (error) => {
        clearInterval(progressInterval);
        this.notificationService.showError('Import failed');
        this.isImportModalOpen.set(false);
        this.importFile.set(null);
        this.importProgress.set(0);
      }
    });
  }

  openExportModal(): void {
    this.isExportModalOpen.set(true);
  }

  exportQuestions(): void {
    this.isExporting.set(true);
    const format = this.exportFormat();
    
    this.questionBankService.exportQuestions(format, this.selectedFilters()).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `questions-export-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.isExporting.set(false);
        this.isExportModalOpen.set(false);
        this.notificationService.showSuccess('Export completed successfully');
      },
      error: (error) => {
        this.isExporting.set(false);
        this.notificationService.showError('Export failed');
      }
    });
  }

  getDifficultyFromString(difficulty: string): DifficultyLevel {
    switch(difficulty.toLowerCase()) {
      case 'easy': return DifficultyLevel.EASY;
      case 'medium': return DifficultyLevel.MEDIUM;
      case 'hard': return DifficultyLevel.HARD;
      default: return DifficultyLevel.MEDIUM;
    }
  }

  openStatisticsModal(): void {
    this.loadStatistics();
    this.isStatisticsModalOpen.set(true);
  }

  refreshData(): void {
    this.questionBankService.loadQuestions(this.currentPage(), this.itemsPerPage());
    this.loadStatistics();
    this.notificationService.showSuccess('Data refreshed');
  }

  isQuestionUsed(question: Question): boolean {
    return question.usageCount > 0;
  }

  getUsageText(question: Question): string {
    return question.usageCount === 1 
      ? 'Used in 1 quiz' 
      : `Used in ${question.usageCount} quizzes`;
  }

  getTruncatedText(text: string, maxLength = 100): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  getCourseName(courseId: string): string {
    const course = this.courses().find(c => c.id === courseId);
    return course ? `${course.code} - ${course.name}` : 'Unknown Course';
  }

  getQuestionTypeColor(type: QuestionType): string {
    const colorMap: Record<QuestionType, string> = {
      [QuestionType.MULTIPLE_CHOICE]: '#6b8e7f',
      [QuestionType.TRUE_FALSE]: '#3b82f6',
      [QuestionType.SHORT_ANSWER]: '#f59e0b',
      [QuestionType.ESSAY]: '#8b5cf6',
      [QuestionType.MATCHING]: '#10b981',
      [QuestionType.FILL_BLANK]: '#ef4444',
      [QuestionType.RATING_SCALE]: '#f97316'
    };
    return colorMap[type] || '#6b7280';
  }

  getPaginationRange(): number[] {
    const current = this.currentPage();
    const total = this.totalPages();
    const range = [];
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      range.push(i);
    }
    
    return range;
  }

  // =============== HELPER METHODS ===============
  
  getActiveQuestionsCount(): number {
    return this.questions().filter(q => q.usageCount > 0).length;
  }

  getHardQuestionsCount(): number {
    return this.questions().filter(q => q.difficulty === DifficultyLevel.HARD).length;
  }

  hasActiveFilters(): boolean {
    const filters = this.selectedFilters();
    return filters && Object.keys(filters).length > 0;
  }

  getQuestionTypeEntries(): Array<{key: string, value: QuestionType}> {
    return Object.entries(QuestionType).map(([key, value]) => ({ 
      key, 
      value: value as QuestionType 
    }));
  }

  getDifficultyLevelEntries(): Array<{key: string, value: DifficultyLevel}> {
    return Object.entries(DifficultyLevel).map(([key, value]) => ({ 
      key, 
      value: value as DifficultyLevel 
    }));
  }

  getCapitalizedDifficulty(difficulty: DifficultyLevel): string {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  }

  getOptionLetter(order: number): string {
    return String.fromCharCode(64 + order);
  }

  getLastUsedText(question: Question): string {
    return question.lastUsedAt ? this.formatDate(question.lastUsedAt) : 'Never';
  }

  // =============== BULK OPERATIONS ===============
  
  toggleQuestionSelection(questionId: string): void {
    const selected = new Set(this.selectedQuestions());
    if (selected.has(questionId)) {
      selected.delete(questionId);
    } else {
      selected.add(questionId);
    }
    this.selectedQuestions.set(selected);
  }

  selectAllQuestions(): void {
    const allIds = this.filteredQuestions().map(q => q.id);
    this.selectedQuestions.set(new Set(allIds));
  }

  clearSelection(): void {
    this.selectedQuestions.set(new Set());
  }

  openBulkDeleteModal(): void {
    if (this.hasSelectedQuestions()) {
      this.isBulkDeleteModalOpen.set(true);
    }
  }

  deleteSelectedQuestions(): void {
    const selectedIds = Array.from(this.selectedQuestions());
    // In a real app, you would call a bulk delete API
    this.notificationService.showSuccess(`Deleted ${selectedIds.length} questions`);
    this.isBulkDeleteModalOpen.set(false);
    this.clearSelection();
    this.loadStatistics();
  }
}