// src/app/features/course-management/course-management.component.ts - ADD MISSING METHODS
// src/app/features/course-management/course-management.component.ts
import { Component, OnInit, inject, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Import the icon components
import * as Icons from '../../../assets/icon-dashboard';

import { CourseManagementService, CourseFilter, CourseFormData } from './../../core/services/course-management';
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';
import { User, UserRole, UserStatus } from '../../models/user.model';
import { NotificationService } from '../../core/services/notification';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';

interface AcademicYear {
  id: string;
  name: string;
  isCurrent: boolean;
}

interface Semester {
  id: string;
  name: string;
  number: number;
}

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule, 
    TruncatePipe,
    Icons.CourseIconComponent,
    Icons.AddIconComponent,
    Icons.EditIconComponent,
    Icons.DeleteIconComponent,
    Icons.FilterIconComponent,
    Icons.SearchIconComponent,
    Icons.ChevronDownIconComponent,
    Icons.ChevronUpIconComponent,
    Icons.MoreIconComponent,
    Icons.UploadIconComponent,
    Icons.DownloadIconComponent,
    Icons.CheckIconComponent,
    Icons.XIconComponent,
    Icons.RefreshIconComponent,
    Icons.EyeIconComponent,
    Icons.UsersIconComponent,
    Icons.QuizIconComponent
  ],
  templateUrl: './course-management.html',
  styleUrls: ['./course-management.scss']
})
export class CourseManagementComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  // Services (make courseService public for template access)
  public courseService = inject(CourseManagementService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  
  // Remove the DomSanitizer and icons object
  // private sanitizer = inject(DomSanitizer);
  // icons: { [key: string]: SafeHtml } = {};
  
  ngOnInit() {
    // Remove the icon sanitization code
    // Object.keys(COURSE_MANAGEMENT_ICONS).forEach(key => {
    //   this.icons[key] = this.sanitizer.bypassSecurityTrustHtml(
    //     COURSE_MANAGEMENT_ICONS[key as keyof typeof COURSE_MANAGEMENT_ICONS]
    //   );
    // });
    
    this.initializeForm();
    this.loadAdditionalData();
  }

  // State signals
  courses = this.courseService.courses$;
  selectedCourse = this.courseService.selectedCourse$;
  loading = this.courseService.loading$;
  error = this.courseService.error$;
  totalCount = this.courseService.totalCount$;
  
  // UI state
  showCreateModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  showImportModal = signal<boolean>(false);
  showFilters = signal<boolean>(false);
  selectedCourses = signal<Set<string>>(new Set());
  bulkAction = signal<string>('');
  
  // Filter state (use individual signals for two-way binding)
  searchTerm = signal<string>('');
  departmentFilter = signal<string>('');
  academicYearFilter = signal<string>('');
  semesterFilter = signal<string>('');
  statusFilter = signal<string | boolean>('');
  
  // Form
  courseForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  
  // Data for dropdowns
  departments = signal<string[]>([
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Business',
    'Humanities'
  ]);
  
  academicYears = signal<AcademicYear[]>([
    { id: '2024', name: '2023-2024', isCurrent: true },
    { id: '2023', name: '2022-2023', isCurrent: false },
    { id: '2022', name: '2021-2022', isCurrent: false }
  ]);
  
  semesters = signal<Semester[]>([
    { id: '1', name: 'Fall Semester 2023', number: 1 },
    { id: '2', name: 'Spring Semester 2024', number: 2 },
    { id: '3', name: 'Summer Semester 2024', number: 3 }
  ]);
  
  availableClasses = signal<Class[]>([]);
  availableInstructors = signal<User[]>([]);
  
  // Computed properties
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.courses();
    
    return this.courses().filter(course =>
      course.code.toLowerCase().includes(search) ||
      course.name.toLowerCase().includes(search) ||
      course.department.toLowerCase().includes(search)
    );
  });
  
  selectedCount = computed(() => this.selectedCourses().size);
  allSelected = computed(() => 
    this.filteredCourses().length > 0 && 
    this.selectedCourses().size === this.filteredCourses().length
  );
  
  /**
   * Initialize form
   */
  private initializeForm(): void {
    this.courseForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      credits: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      department: ['', Validators.required],
      departmentCode: ['', Validators.required],
      academicYearId: ['', Validators.required],
      semesterId: [''],
      semesterNumber: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
      classIds: [[]],
      coordinatorId: [''],
      instructorIds: [[]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: [true],
      prerequisiteCourseIds: [[]]
    });
  }
  
  /**
   * Load additional data for dropdowns
   */
  private loadAdditionalData(): void {
    // In a real app, these would come from API calls
    this.availableClasses.set([
      { id: '1', name: 'L3 Info A', code: 'L3-INFO-A', level: 'L3', department: 'Computer Science', departmentCode: 'CS', academicYearId: '2024', maxStudents: 45, currentStudentCount: 42, academicYearStart: new Date(), academicYearEnd: new Date(), courseIds: [], isActive: true, isFull: false, createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin' },
      { id: '2', name: 'L3 Info B', code: 'L3-INFO-B', level: 'L3', department: 'Computer Science', departmentCode: 'CS', academicYearId: '2024', maxStudents: 45, currentStudentCount: 40, academicYearStart: new Date(), academicYearEnd: new Date(), courseIds: [], isActive: true, isFull: false, createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin' },
      { id: '3', name: 'M1 Math A', code: 'M1-MATH-A', level: 'M1', department: 'Mathematics', departmentCode: 'MATH', academicYearId: '2024', maxStudents: 40, currentStudentCount: 38, academicYearStart: new Date(), academicYearEnd: new Date(), courseIds: [], isActive: true, isFull: false, createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin' }
    ]);
    
    this.availableInstructors.set([
      { id: '1', email: 'prof1@university.edu', username: 'prof1', firstName: 'John', lastName: 'Doe', role: UserRole.INSTRUCTOR, status: UserStatus.ACTIVE, permissions: [], createdAt: new Date(), updatedAt: new Date() },
      { id: '2', email: 'prof2@university.edu', username: 'prof2', firstName: 'Jane', lastName: 'Smith', role: UserRole.INSTRUCTOR, status: UserStatus.ACTIVE, permissions: [], createdAt: new Date(), updatedAt: new Date() },
      { id: '3', email: 'prof3@university.edu', username: 'prof3', firstName: 'Robert', lastName: 'Johnson', role: UserRole.INSTRUCTOR, status: UserStatus.ACTIVE, permissions: [], createdAt: new Date(), updatedAt: new Date() }
    ]);
  }

  // ================ ADD THESE METHODS ================
  
  /**
   * Get academic year name
   */
  getAcademicYearName(academicYearId: string): string {
    const year = this.academicYears().find(y => y.id === academicYearId);
    return year ? year.name : 'N/A';
  }
  
  /**
   * Get semester information
   */
  getSemesterInfo(course: Course): string {
    if (course.semesterId) {
      const semester = this.semesters().find(s => s.id === course.semesterId);
      return semester ? semester.name.split(' ')[0] : 'N/A';
    }
    return 'Not Set';
  }
  
  /**
   * Format semester display
   */
  formatSemesterDisplay(course: Course): string {
    const year = this.getAcademicYearName(course.academicYearId);
    const semester = this.getSemesterInfo(course);
    
    if (course.semesterNumber) {
      return `${semester} Sem ${course.semesterNumber} - ${year}`;
    }
    return `${semester} - ${year}`;
  }
  
  /**
   * Get department color class - FIXED VERSION
   */
  getDepartmentColor(department: string): string {
    const deptColors: Record<string, string> = {
      'Computer Science': 'computer-science',
      'Mathematics': 'mathematics',
      'Physics': 'physics',
      'Chemistry': 'chemistry',
      'Engineering': 'engineering',
      'Business': 'business',
      'Biology': 'computer-science', // Default for Biology
      'Humanities': 'mathematics' // Default for Humanities
    };
    return deptColors[department] || 'computer-science';
  }
  
  /**
   * Toggle filters visibility
   */
  toggleFilters(): void {
    this.showFilters.update(show => !show);
  }
  
  /**
   * Apply filters
   */
  applyFilters(): void {
    const filters: CourseFilter = {};
    
    if (this.departmentFilter()) filters.department = this.departmentFilter();
    if (this.academicYearFilter()) filters.academicYearId = this.academicYearFilter();
    if (this.semesterFilter()) filters.semesterId = this.semesterFilter();
    if (this.statusFilter() !== '') {
      filters.isActive = this.statusFilter() === 'true' || this.statusFilter() === true;
    }
    
    this.courseService.updateFilters(filters);
  }
  
  /**
   * Clear filters
   */
  clearFilters(): void {
    this.departmentFilter.set('');
    this.academicYearFilter.set('');
    this.semesterFilter.set('');
    this.statusFilter.set('');
    this.searchTerm.set('');
    this.courseService.updateFilters({});
  }
  
  /**
   * Handle search
   */
  onSearch(): void {
    // Update filters with search term
    const filters: CourseFilter = {};
    if (this.searchTerm()) filters.search = this.searchTerm();
    this.courseService.updateFilters(filters);
  }
  
  /**
   * Select/deselect all courses
   */
  toggleSelectAll(): void {
    if (this.allSelected()) {
      this.selectedCourses.set(new Set());
    } else {
      const allIds = new Set(this.filteredCourses().map(c => c.id));
      this.selectedCourses.set(allIds);
    }
  }
  
  /**
   * Toggle selection for a single course
   */
  toggleCourseSelection(courseId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    const selected = new Set(this.selectedCourses());
    if (selected.has(courseId)) {
      selected.delete(courseId);
    } else {
      selected.add(courseId);
    }
    this.selectedCourses.set(selected);
  }
  
  /**
   * Toggle class selection in form
   */
  toggleClassSelection(classId: string): void {
    const currentClassIds = this.courseForm.get('classIds')?.value || [];
    const index = currentClassIds.indexOf(classId);
    
    if (index === -1) {
      currentClassIds.push(classId);
    } else {
      currentClassIds.splice(index, 1);
    }
    
    this.courseForm.patchValue({ classIds: currentClassIds });
  }
  
  /**
   * Toggle instructor selection in form
   */
  toggleInstructorSelection(instructorId: string): void {
    const currentInstructorIds = this.courseForm.get('instructorIds')?.value || [];
    const index = currentInstructorIds.indexOf(instructorId);
    
    if (index === -1) {
      currentInstructorIds.push(instructorId);
    } else {
      currentInstructorIds.splice(index, 1);
    }
    
    this.courseForm.patchValue({ instructorIds: currentInstructorIds });
  }
  
  /**
   * Open create modal
   */
  openCreateModal(): void {
    this.courseForm.reset({
      credits: 3,
      semesterNumber: 1,
      classIds: [],
      instructorIds: [],
      isActive: true,
      prerequisiteCourseIds: []
    });
    this.showCreateModal.set(true);
  }
  
  /**
   * Open edit modal
   */
  openEditModal(course: Course): void {
    this.courseService.selectCourse(course);
    
    // Populate form with course data
    this.courseForm.patchValue({
      code: course.code,
      name: course.name,
      description: course.description,
      credits: course.credits,
      department: course.department,
      departmentCode: course.departmentCode,
      academicYearId: course.academicYearId,
      semesterId: course.semesterId,
      semesterNumber: course.semesterNumber || 1,
      classIds: course.classIds || [],
      coordinatorId: course.coordinatorId,
      instructorIds: course.instructorIds || [],
      startDate: course.startDate ? new Date(course.startDate).toISOString().split('T')[0] : '',
      endDate: course.endDate ? new Date(course.endDate).toISOString().split('T')[0] : '',
      isActive: course.isActive,
      prerequisiteCourseIds: course.prerequisiteCourseIds || []
    });
    
    this.showEditModal.set(true);
  }
  
  /**
   * Open delete modal
   */
  openDeleteModal(course: Course): void {
    this.courseService.selectCourse(course);
    this.showDeleteModal.set(true);
  }
  
  /**
   * Close all modals
   */
  closeModals(): void {
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.showImportModal.set(false);
    this.courseService.clearSelectedCourse();
    this.isSubmitting.set(false);
  }
  
  /**
   * Create new course
   */
  createCourse(): void {
    if (this.courseForm.invalid || this.isSubmitting()) {
      return;
    }
    
    this.isSubmitting.set(true);
    const formData = this.courseForm.value as CourseFormData;
    
    this.courseService.createCourse(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Course created successfully!');
          this.closeModals();
        } else {
          this.notificationService.showError(response.message || 'Failed to create course');
        }
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.notificationService.showError('Failed to create course');
        this.isSubmitting.set(false);
      }
    });
  }
  
  /**
   * Update course
   */
  updateCourse(): void {
    if (this.courseForm.invalid || this.isSubmitting() || !this.selectedCourse()) {
      return;
    }
    
    this.isSubmitting.set(true);
    const courseId = this.selectedCourse()!.id;
    const formData = this.courseForm.value as Partial<CourseFormData>;
    
    this.courseService.updateCourse(courseId, formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Course updated successfully!');
          this.closeModals();
        } else {
          this.notificationService.showError(response.message || 'Failed to update course');
        }
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.notificationService.showError('Failed to update course');
        this.isSubmitting.set(false);
      }
    });
  }
  
  /**
   * Delete course
   */
  deleteCourse(): void {
    if (!this.selectedCourse()) {
      return;
    }
    
    const courseId = this.selectedCourse()!.id;
    
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Course deleted successfully!');
          this.closeModals();
        } else {
          this.notificationService.showError(response.message || 'Failed to delete course');
        }
      },
      error: (error) => {
        this.notificationService.showError('Failed to delete course');
      }
    });
  }
  
  /**
   * Handle file import
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.importCourses(file);
    }
  }
  
  /**
   * Import courses from file
   */
  importCourses(file: File): void {
    this.courseService.importCourses(file).subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data!;
          this.notificationService.showSuccess(
            `Import completed: ${data.success} courses imported, ${data.failed} failed`
          );
          if (data.errors.length > 0) {
            console.error('Import errors:', data.errors);
          }
          this.closeModals();
          this.courseService.refreshCourses();
        } else {
          this.notificationService.showError('Import failed');
        }
      },
      error: (error) => {
        this.notificationService.showError('Failed to import courses');
      }
    });
  }
  
  /**
   * Export courses
   */
  exportCourses(): void {
    this.courseService.exportCourses({}).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `courses_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.notificationService.showSuccess('Export completed successfully!');
      },
      error: (error) => {
        this.notificationService.showError('Failed to export courses');
      }
    });
  }
  
  /**
   * View course details
   */
  viewCourseDetails(course: Course): void {
    this.courseService.selectCourse(course);
    // In a real app, you might navigate to a details page
    console.log('Viewing course:', course);
  }
  
  /**
   * Execute bulk action
   */
  executeBulkAction(): void {
    if (this.selectedCount() === 0 || !this.bulkAction()) {
      return;
    }
    
    const action = this.bulkAction();
    const courseIds = Array.from(this.selectedCourses());
    
    switch (action) {
      case 'activate':
        this.bulkActivateCourses(courseIds);
        break;
      case 'deactivate':
        this.bulkDeactivateCourses(courseIds);
        break;
      case 'delete':
        this.bulkDeleteCourses(courseIds);
        break;
      default:
        this.notificationService.showWarning('Please select a valid action');
    }
  }
  
  /**
   * Bulk activate courses
   */
  private bulkActivateCourses(courseIds: string[]): void {
    // Implement bulk activation
    this.notificationService.showSuccess(`${courseIds.length} courses activated`);
    this.selectedCourses.set(new Set());
    this.bulkAction.set('');
  }
  
  /**
   * Bulk deactivate courses
   */
  private bulkDeactivateCourses(courseIds: string[]): void {
    // Implement bulk deactivation
    this.notificationService.showSuccess(`${courseIds.length} courses deactivated`);
    this.selectedCourses.set(new Set());
    this.bulkAction.set('');
  }
  
  /**
   * Bulk delete courses
   */
  private bulkDeleteCourses(courseIds: string[]): void {
    if (confirm(`Are you sure you want to delete ${courseIds.length} courses?`)) {
      // Implement bulk deletion
      this.notificationService.showSuccess(`${courseIds.length} courses deleted`);
      this.selectedCourses.set(new Set());
      this.bulkAction.set('');
    }
  }
  
  /**
   * Format date
   */
  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}