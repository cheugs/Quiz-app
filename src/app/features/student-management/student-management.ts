import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { StudentManagementService } from '../../core/services/student-management';
import { Student, StudentStatus, VerificationStatus } from '../../models/student.model';
import { Class } from '../../models/class.model';

// Import icon components
import { 
  UsersIconComponent,
  SearchIconComponent,
  FilterIconComponent,
  RefreshIconComponent,
  PlusIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  EyeIconComponent,
  MailIconComponent,
  CheckIconComponent,
  XIconComponent,
  DownloadIconComponent,
  UploadIconComponent,
  MoreIconComponent,
  CheckCircleIconComponent,
  XCircleIconComponent,
  AlertCircleIconComponent,
  ClockIconComponent,
  CalendarIconComponent,
  BarChartIconComponent,
  AwardIconComponent,
  SchoolIconComponent,
  TagIconComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  CopyIconComponent,
  SendIconComponent,
  SaveIconComponent,
  ChevronLeftIconComponent,
  ChevronRightIconComponent,
  FileTextIconComponent,
  BookIconComponent,
  HashIconComponent,
    PhoneIconComponent,
  UserIconComponent,
  BuildingIconComponent,
  MapPinIconComponent,
  UserCheckIconComponent,
  ShieldIconComponent
} from '../../../assets/icon-dashboard';

interface StatusOption {
  value: StudentStatus;
  label: string;
  color: string;
}

interface VerificationOption {
  value: VerificationStatus;
  label: string;
  color: string;
}

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    // Icon components
    UsersIconComponent,
    SearchIconComponent,
    FilterIconComponent,
    RefreshIconComponent,
    PlusIconComponent,
    EditIconComponent,
    DeleteIconComponent,
    EyeIconComponent,
    MailIconComponent,
    CheckIconComponent,
    XIconComponent,
    DownloadIconComponent,
    UploadIconComponent,
    MoreIconComponent,
    CheckCircleIconComponent,
    XCircleIconComponent,
    AlertCircleIconComponent,
    ClockIconComponent,
    CalendarIconComponent,
    BarChartIconComponent,
    AwardIconComponent,
    SchoolIconComponent,
    TagIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    CopyIconComponent,
    SendIconComponent,
    SaveIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    FileTextIconComponent,
    BookIconComponent,
    HashIconComponent,
      PhoneIconComponent,
  UserIconComponent,
  BuildingIconComponent,
  MapPinIconComponent,
  UserCheckIconComponent,
  ShieldIconComponent
  ],
  templateUrl: './student-management.html',
  styleUrls: ['./student-management.scss']
})
export class StudentManagementComponent implements OnInit {
  studentService = inject(StudentManagementService);
  private router = inject(Router);

  // Signals for reactive state
  isLoading = signal(false);
  searchQuery = signal('');
  selectedClass = signal<string>('');
  selectedStatus = signal<StudentStatus[]>([]);
  selectedVerificationStatus = signal<VerificationStatus[]>([]);
  selectedDepartment = signal<string>('');
  showFilters = signal(false);
  selectedStudent = signal<Student | null>(null);
  showCreateModal = signal(false);
  showViewModal = signal(false);
  showEditModal = signal(false);
  
  // Create/edit student form signals
  studentForm = signal({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    dateOfBirth: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    phoneNumber: '',
    currentClassId: '',
    department: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Computed properties
  filteredStudents = computed(() => {
    return this.studentService.filterStudents({
      search: this.searchQuery(),
      classId: this.selectedClass(),
      status: this.selectedStatus(),
      verificationStatus: this.selectedVerificationStatus(),
      department: this.selectedDepartment()
    });
  });

  paginatedStudents = computed(() => {
    const allStudents = this.filteredStudents();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return allStudents.slice(start, end);
  });

  students = computed(() => this.studentService.students$());
  classes = computed(() => this.studentService.classes$());
  departments = computed(() => this.studentService.getDepartments());
  studentStats = computed(() => this.studentService.getStudentStats());

  // Status options
  statusOptions: StatusOption[] = [
    { value: StudentStatus.ACTIVE, label: 'Active', color: this.getStatusColor(StudentStatus.ACTIVE) },
    { value: StudentStatus.GRADUATED, label: 'Graduated', color: this.getStatusColor(StudentStatus.GRADUATED) },
    { value: StudentStatus.SUSPENDED, label: 'Suspended', color: this.getStatusColor(StudentStatus.SUSPENDED) },
    { value: StudentStatus.DROPPED, label: 'Dropped', color: this.getStatusColor(StudentStatus.DROPPED) }
  ];

  // Verification status options
  verificationOptions: VerificationOption[] = [
    { value: VerificationStatus.VERIFIED, label: 'Verified', color: this.getVerificationColor(VerificationStatus.VERIFIED) },
    { value: VerificationStatus.PENDING, label: 'Pending', color: this.getVerificationColor(VerificationStatus.PENDING) },
    { value: VerificationStatus.UNVERIFIED, label: 'Unverified', color: this.getVerificationColor(VerificationStatus.UNVERIFIED) }
  ];

  constructor() {}

  ngOnInit(): void {
    this.updateTotalPages();
  }

  /**
   * Update total pages for pagination
   */
  updateTotalPages(): void {
    const total = this.filteredStudents().length;
    this.totalPages.set(Math.ceil(total / this.pageSize()));
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
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
 * Update form field
 */
updateFormField<K extends keyof ReturnType<typeof this.studentForm>>(
  field: K, 
  value: ReturnType<typeof this.studentForm>[K]
): void {
  this.studentForm.update(form => ({
    ...form,
    [field]: value
  }));
}

  /**
   * Get status badge color
   */
  getStatusColor(status: StudentStatus): string {
    return this.studentService.getStatusColor(status);
  }

  /**
   * Get verification status badge color
   */
  getVerificationColor(status: VerificationStatus): string {
    return this.studentService.getVerificationColor(status);
  }

  /**
   * Get class name by ID
   */
  getClassName(classId: string): string {
    return this.studentService.getClassName(classId);
  }

  /**
   * Toggle status filter
   */
  toggleStatus(status: StudentStatus): void {
    const current = this.selectedStatus();
    if (current.includes(status)) {
      this.selectedStatus.set(current.filter(s => s !== status));
    } else {
      this.selectedStatus.set([...current, status]);
    }
    this.currentPage.set(1);
    this.updateTotalPages();
  }

  /**
   * Toggle verification status filter
   */
  toggleVerificationStatus(status: VerificationStatus): void {
    const current = this.selectedVerificationStatus();
    if (current.includes(status)) {
      this.selectedVerificationStatus.set(current.filter(s => s !== status));
    } else {
      this.selectedVerificationStatus.set([...current, status]);
    }
    this.currentPage.set(1);
    this.updateTotalPages();
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedClass.set('');
    this.selectedStatus.set([]);
    this.selectedVerificationStatus.set([]);
    this.selectedDepartment.set('');
    this.currentPage.set(1);
    this.updateTotalPages();
  }

  /**
   * Open create student modal
   */
  openCreateModal(): void {
    this.studentForm.set({
      firstName: '',
      lastName: '',
      email: '',
      studentId: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      currentClassId: '',
      department: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    this.showCreateModal.set(true);
  }

  /**
   * Close create modal
   */
  closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  /**
   * Create new student
   */
  createStudent(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading.set(true);
    
    const studentData = {
      ...this.studentForm(),
      dateOfBirth: this.studentForm().dateOfBirth ? new Date(this.studentForm().dateOfBirth) : undefined,
      gender: this.studentForm().gender as 'male' | 'female' | 'other',
      academicYearId: '2024',
      status: StudentStatus.ACTIVE,
      verificationStatus: VerificationStatus.PENDING,
      isActive: true,
      passwordResetRequired: true
    };

    this.studentService.createStudent(studentData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.closeCreateModal();
        // Show success message
        alert('Student created successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error creating student:', error);
        alert('Failed to create student. Please try again.');
      }
    });
  }

  /**
   * Validate form
   */
  isFormValid(): boolean {
    const form = this.studentForm();
    return !!form.firstName.trim() && 
           !!form.lastName.trim() &&
           !!form.email.trim() &&
           !!form.currentClassId &&
           !!form.department;
  }

  /**
   * View student details
   */
  viewStudent(student: Student): void {
    this.selectedStudent.set(student);
    this.showViewModal.set(true);
  }

  /**
   * Close view modal
   */
  closeViewModal(): void {
    this.showViewModal.set(false);
    this.selectedStudent.set(null);
  }

  /**
   * Edit student
   */
  editStudent(student: Student): void {
    this.selectedStudent.set(student);
    this.studentForm.set({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentId: student.studentId,
      dateOfBirth: student.dateOfBirth ? this.formatDateForInput(student.dateOfBirth) : '',
      gender: student.gender || '',
      phoneNumber: student.phoneNumber || '',
      currentClassId: student.currentClassId,
      department: student.department,
      address: student.address || '',
      emergencyContact: student.emergencyContact || '',
      emergencyPhone: student.emergencyPhone || ''
    });
    this.showEditModal.set(true);
  }

  /**
   * Format date for input field
   */
  formatDateForInput(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  /**
   * Close edit modal
   */
  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedStudent.set(null);
  }

  /**
   * Update student
   */
  updateStudent(): void {
    if (!this.selectedStudent() || !this.isFormValid()) {
      return;
    }

    this.isLoading.set(true);
    
    const studentData = {
      ...this.studentForm(),
      dateOfBirth: this.studentForm().dateOfBirth ? new Date(this.studentForm().dateOfBirth) : undefined,
      gender: this.studentForm().gender as 'male' | 'female' | 'other'
    };

    this.studentService.updateStudent(this.selectedStudent()!.id, studentData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.closeEditModal();
        // Show success message
        alert('Student updated successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error updating student:', error);
        alert('Failed to update student. Please try again.');
      }
    });
  }

  /**
   * Delete student
   */
  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete "${student.firstName} ${student.lastName}"?`)) {
      this.isLoading.set(true);
      this.studentService.deleteStudent(student.id).subscribe({
        next: () => {
          this.isLoading.set(false);
          // Show success message
          alert('Student deleted successfully!');
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error deleting student:', error);
          alert('Failed to delete student. Please try again.');
        }
      });
    }
  }

  /**
   * Verify student account
   */
  verifyStudent(student: Student): void {
    if (student.verificationStatus === VerificationStatus.VERIFIED) {
      return;
    }

    this.isLoading.set(true);
    this.studentService.verifyStudent(student.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        // Show success message
        alert('Student verified successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error verifying student:', error);
        alert('Failed to verify student. Please try again.');
      }
    });
  }

  /**
   * Reset student password
   */
  resetPassword(student: Student): void {
    this.isLoading.set(true);
    this.studentService.resetStudentPassword(student.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        // Show success message
        alert('Password reset request sent successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error resetting password:', error);
        alert('Failed to reset password. Please try again.');
      }
    });
  }

  // Expose Math to template
  Math = Math;
  
  // Add missing method for pagination
  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push(-1); // Ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = current - 2; i <= current + 2; i++) pages.push(i);
        pages.push(-1); // Ellipsis
        pages.push(total);
      }
    }
    
    return pages;
  }
  
  // Add these missing methods
  updateStudentStatus(status: StudentStatus): void {
    if (this.selectedStudent()) {
      // Update logic here
      console.log('Update status to:', status);
    }
  }
  
  updateVerificationStatus(status: VerificationStatus): void {
    if (this.selectedStudent()) {
      // Update logic here
      console.log('Update verification to:', status);
    }
  }

  /**
   * Send verification email
   */
  sendVerificationEmail(student: Student): void {
    // Implement email sending logic
    alert(`Verification email sent to ${student.email}`);
  }

  /**
   * Export student data
   */
  exportStudentData(format: 'csv' | 'excel' = 'excel'): void {
    // Implement export logic
    const students = this.filteredStudents();
    console.log(`Exporting ${students.length} students in ${format} format`);
    alert(`Exporting ${students.length} students...`);
  }

  /**
   * Import student data
   */
  importStudentData(): void {
    // Implement import logic
    alert('Please select a CSV file to import');
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
    this.studentService.loadStudents();
    setTimeout(() => {
      this.isLoading.set(false);
      this.currentPage.set(1);
      this.updateTotalPages();
    }, 1000);
  }

  /**
   * Get filtered count
   */
  getFilteredCount(): number {
    return this.filteredStudents().length;
  }

  /**
   * Get total count
   */
  getTotalCount(): number {
    return this.students().length;
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return (
      this.searchQuery().length > 0 ||
      this.selectedClass().length > 0 ||
      this.selectedStatus().length > 0 ||
      this.selectedVerificationStatus().length > 0 ||
      this.selectedDepartment().length > 0
    );
  }

  /**
   * Get student activities
   */
  getStudentActivities(studentId: string) {
    return this.studentService.getStudentActivities(studentId);
  }

  /**
   * Get last activity time
   */
  getLastActivityTime(student: Student): string {
    if (student.lastQuizTakenAt) {
      return this.formatDateTime(student.lastQuizTakenAt);
    }
    return 'No activity yet';
  }

  /**
   * Get performance color based on score
   */
  getPerformanceColor(score?: number): string {
    if (!score) return '#6b7280';
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  }
}