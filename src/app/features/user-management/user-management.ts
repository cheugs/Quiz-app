// src/app/features/user-management/user-management.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserManagementService } from '../../core/services/user-management';
import { User, UserRole, UserStatus, AdminUser } from '../../models/user.model';
import { Course } from '../../models/course.model';
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
  MoreIconComponent,
  CheckIconComponent,
  XIconComponent,
  EyeIconComponent,
  MailIconComponent,
  PhoneIconComponent,
  CalendarIconComponent,
  AwardIconComponent,
  BarChartIconComponent,
  SettingsIconComponent,
  ShieldIconComponent,
  UserCheckIconComponent,
  UserXIconComponent,
  UserIconComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  CopyIconComponent,
  DownloadIconComponent,
  UploadIconComponent,
  SaveIconComponent,
  BookIconComponent,
  SchoolIconComponent,
  TagIconComponent,
  ClockIconComponent,
  CheckCircleIconComponent,
  XCircleIconComponent,
  AlertCircleIconComponent,
  KeyIconComponent,
  LockIconComponent,
  UnlockIconComponent,
  Trash2IconComponent,
  FileTextIconComponent,
  PercentIconComponent,
  StarIconComponent
} from '../../../assets/icon-dashboard';

interface RoleOption {
  value: UserRole;
  label: string;
  color: string;
}

interface StatusOption {
  value: UserStatus;
  label: string;
  color: string;
}

interface Permission {
  id: string;
  label: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-user-management',
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
    MoreIconComponent,
    CheckIconComponent,
    XIconComponent,
    EyeIconComponent,
    MailIconComponent,
    PhoneIconComponent,
    CalendarIconComponent,
    AwardIconComponent,
    BarChartIconComponent,
    SettingsIconComponent,
    ShieldIconComponent,
    UserCheckIconComponent,
    UserXIconComponent,
    UserIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    CopyIconComponent,
    DownloadIconComponent,
    UploadIconComponent,
    SaveIconComponent,
    BookIconComponent,
    SchoolIconComponent,
    TagIconComponent,
    ClockIconComponent,
    CheckCircleIconComponent,
    XCircleIconComponent,
    AlertCircleIconComponent,
    KeyIconComponent,
    LockIconComponent,
    UnlockIconComponent,
    Trash2IconComponent,
    FileTextIconComponent,
    PercentIconComponent,
    StarIconComponent
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent implements OnInit {

  // src/app/features/user-management/user-management.component.ts

// Add these at the top of your component class
readonly UserStatus = UserStatus;
readonly UserRole = UserRole;

  userService = inject(UserManagementService);

  // Signals for reactive state
  isLoading = signal(false);
  searchQuery = signal('');
  selectedRole = signal<UserRole[]>([]);
  selectedStatus = signal<UserStatus[]>([]);
  selectedDepartment = signal<string>('');
  showFilters = signal(false);
  selectedUser = signal<AdminUser | null>(null);
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showPermissionsModal = signal(false);
  isCreating = signal(false);
  isEditing = signal(false);

  // Create/edit form signals
  newUserForm = signal({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    role: UserRole.ADMINISTRATOR,
    status: UserStatus.PENDING,
    department: '',
    phoneNumber: '',
    position: '',
    hireDate: '',
    managedDepartments: [] as string[],
    canCreateQuizzes: false,
    canEditQuizzes: false,
    canDeleteQuizzes: false,
    canViewResponses: false,
    canExportData: false,
    canManageStudents: false,
    canManageQuestions: false,
    canSendNotifications: false,
    canManageUsers: false,
    canConfigureSystem: false
  });

  // Add after the existing signals in your component class
editUserForm = signal({
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  role: UserRole.ADMINISTRATOR,
  status: UserStatus.PENDING,
  department: '',
  phoneNumber: '',
  position: '',
  hireDate: '',
  managedDepartments: [] as string[],
  canCreateQuizzes: false,
  canEditQuizzes: false,
  canDeleteQuizzes: false,
  canViewResponses: false,
  canExportData: false,
  canManageStudents: false,
  canManageQuestions: false,
  canSendNotifications: false,
  canManageUsers: false,
  canConfigureSystem: false
});

// Add the missing method for updating edit form fields
updateEditFormField(field: string, value: any): void {
  this.editUserForm.update(current => ({ ...current, [field]: value }));
}

// Add validation method for edit form
isEditFormValid(): boolean {
  const form = this.editUserForm();
  return !!form.email.trim() && 
         !!form.username.trim() && 
         !!form.firstName.trim() && 
         !!form.lastName.trim() &&
         !!form.department.trim();
}

  // Permissions management
  selectedPermissions = signal<string[]>([]);
  
  // Computed properties
  filteredUsers = computed(() => {
    return this.userService.filterUsers({
      role: this.selectedRole(),
      status: this.selectedStatus(),
      department: this.selectedDepartment(),
      search: this.searchQuery()
    });
  });

  users = computed(() => this.userService.users$());
  departments = computed(() => this.userService.departments$());
  courses = computed(() => this.userService.courses$());
  classes = computed(() => this.userService.classes$());
  stats = computed(() => this.userService.stats$());

  // Role options
  roleOptions: RoleOption[] = [
    { value: UserRole.SUPER_ADMIN, label: 'Super Admin', color: this.getRoleColor(UserRole.SUPER_ADMIN) },
    { value: UserRole.ADMINISTRATOR, label: 'Administrator', color: this.getRoleColor(UserRole.ADMINISTRATOR) },
    { value: UserRole.COORDINATOR, label: 'Coordinator', color: this.getRoleColor(UserRole.COORDINATOR) },
    { value: UserRole.INSTRUCTOR, label: 'Instructor', color: this.getRoleColor(UserRole.INSTRUCTOR) }
  ];

  // Status options
  statusOptions: StatusOption[] = [
    { value: UserStatus.ACTIVE, label: 'Active', color: this.getStatusColor(UserStatus.ACTIVE) },
    { value: UserStatus.SUSPENDED, label: 'Suspended', color: this.getStatusColor(UserStatus.SUSPENDED) },
    { value: UserStatus.PENDING, label: 'Pending', color: this.getStatusColor(UserStatus.PENDING) },
    { value: UserStatus.INACTIVE, label: 'Inactive', color: this.getStatusColor(UserStatus.INACTIVE) }
  ];

  // Permission categories
  permissions: Permission[] = [
    // Quiz Management
    { id: 'create_quizzes', label: 'Create Quizzes', description: 'Create new evaluation quizzes', category: 'Quiz Management' },
    { id: 'edit_quizzes', label: 'Edit Quizzes', description: 'Modify existing quizzes', category: 'Quiz Management' },
    { id: 'delete_quizzes', label: 'Delete Quizzes', description: 'Remove quizzes from the system', category: 'Quiz Management' },
    { id: 'publish_quizzes', label: 'Publish Quizzes', description: 'Publish quizzes for students', category: 'Quiz Management' },
    
    // Question Management
    { id: 'manage_questions', label: 'Manage Questions', description: 'Add/edit questions in question bank', category: 'Question Management' },
    { id: 'import_questions', label: 'Import Questions', description: 'Import questions from Excel/CSV', category: 'Question Management' },
    { id: 'export_questions', label: 'Export Questions', description: 'Export questions to Excel/CSV', category: 'Question Management' },
    
    // Student Management
    { id: 'manage_students', label: 'Manage Students', description: 'Add/edit/remove student accounts', category: 'Student Management' },
    { id: 'import_students', label: 'Import Students', description: 'Import students from CSV', category: 'Student Management' },
    { id: 'verify_students', label: 'Verify Students', description: 'Verify student accounts', category: 'Student Management' },
    
    // Response Viewing
    { id: 'view_responses', label: 'View Responses', description: 'View student quiz responses', category: 'Response Viewing' },
    { id: 'export_responses', label: 'Export Responses', description: 'Export response data', category: 'Response Viewing' },
    { id: 'grade_responses', label: 'Grade Responses', description: 'Grade open-ended responses', category: 'Response Viewing' },
    
    // System Configuration
    { id: 'configure_system', label: 'Configure System', description: 'Change system settings', category: 'System Configuration' },
    { id: 'manage_academic_years', label: 'Manage Academic Years', description: 'Configure academic years and semesters', category: 'System Configuration' },
    { id: 'manage_courses', label: 'Manage Courses', description: 'Add/edit course catalog', category: 'System Configuration' },
    { id: 'manage_classes', label: 'Manage Classes', description: 'Configure class structures', category: 'System Configuration' },
    
    // User Management
    { id: 'manage_users', label: 'Manage Users', description: 'Add/edit administrator accounts', category: 'User Management' },
    { id: 'assign_roles', label: 'Assign Roles', description: 'Assign roles to administrators', category: 'User Management' },
    { id: 'view_activity_logs', label: 'View Activity Logs', description: 'View administrator activity logs', category: 'User Management' },
    
    // Notifications
    { id: 'send_notifications', label: 'Send Notifications', description: 'Send notifications to students', category: 'Notifications' },
    { id: 'manage_templates', label: 'Manage Templates', description: 'Create/edit notification templates', category: 'Notifications' },
    
    // Analytics
    { id: 'view_analytics', label: 'View Analytics', description: 'Access system analytics dashboard', category: 'Analytics' },
    { id: 'export_analytics', label: 'Export Analytics', description: 'Export analytics reports', category: 'Analytics' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize form with default date
    const today = new Date().toISOString().split('T')[0];
    this.newUserForm.update(form => ({ ...form, hireDate: today }));
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
   * Get role badge color
   */
  getRoleColor(role: UserRole): string {
    return this.userService.getRoleColor(role);
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: UserStatus): string {
    return this.userService.getStatusColor(status);
  }

  // Add these methods to handle form updates
updateFormField(field: string, value: any): void {
  this.newUserForm.update(current => ({ ...current, [field]: value }));
}

updateFirstName(value: string): void {
  this.updateFormField('firstName', value);
}

updateLastName(value: string): void {
  this.updateFormField('lastName', value);
}

updateEmail(value: string): void {
  this.updateFormField('email', value);
}

updateUsername(value: string): void {
  this.updateFormField('username', value);
}

updatePhoneNumber(value: string): void {
  this.updateFormField('phoneNumber', value);
}

updateDepartment(value: string): void {
  this.updateFormField('department', value);
}

updatePosition(value: string): void {
  this.updateFormField('position', value);
}

updateHireDate(value: string): void {
  this.updateFormField('hireDate', value);
}

updateRole(value: UserRole): void {
  this.updateFormField('role', value);
}

updateStatus(value: UserStatus): void {
  this.updateFormField('status', value);
}

// Add a similar method for the edit form if needed:
toggleEditPermission(permission: string): void {
  const currentValue = (this.editUserForm() as any)[permission];
  this.editUserForm.update(form => ({ 
    ...form, 
    [permission]: !currentValue 
  }));
}

// togglePermission(permission: string): void {
//   const currentValue = (this.newUserForm() as any)[permission];
//   this.updateFormField(permission, !currentValue);
// }

  /**
   * Get role label
   */
  getRoleLabel(role: UserRole): string {
    return this.userService.getRoleLabel(role);
  }

  /**
   * Get status label
   */
  getStatusLabel(status: UserStatus): string {
    return this.userService.getStatusLabel(status);
  }

  /**
   * Toggle role filter
   */
  toggleRole(role: UserRole): void {
    const current = this.selectedRole();
    if (current.includes(role)) {
      this.selectedRole.set(current.filter(r => r !== role));
    } else {
      this.selectedRole.set([...current, role]);
    }
  }

  /**
   * Toggle status filter
   */
  toggleStatus(status: UserStatus): void {
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
    this.selectedRole.set([]);
    this.selectedStatus.set([]);
    this.selectedDepartment.set('');
  }

  /**
   * Open create user modal
   */
  openCreateModal(): void {
    this.showCreateModal.set(true);
    this.resetForm();
  }

  /**
   * Close create user modal
   */
  closeCreateModal(): void {
    this.showCreateModal.set(false);
    this.resetForm();
  }

  /**
   * Open edit user modal
   */
  openEditModal(user: AdminUser): void {
    this.selectedUser.set(user);
    this.showEditModal.set(true);
    
    // Populate form with user data
    this.newUserForm.set({
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      department: user.department || '',
      phoneNumber: user.phoneNumber || '',
      position: user.position,
      hireDate: user.hireDate ? new Date(user.hireDate).toISOString().split('T')[0] : '',
      managedDepartments: user.managedDepartments || [],
      canCreateQuizzes: user.canCreateQuizzes,
      canEditQuizzes: user.canEditQuizzes,
      canDeleteQuizzes: user.canDeleteQuizzes,
      canViewResponses: user.canViewResponses,
      canExportData: user.canExportData,
      canManageStudents: user.canManageStudents,
      canManageQuestions: user.canManageQuestions,
      canSendNotifications: user.canSendNotifications,
      canManageUsers: user.canManageUsers,
      canConfigureSystem: user.canConfigureSystem
    });
  }

  /**
   * Close edit user modal
   */
  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedUser.set(null);
    this.resetForm();
  }

  /**
   * Open permissions modal
   */
  openPermissionsModal(user: AdminUser): void {
    this.selectedUser.set(user);
    this.showPermissionsModal.set(true);
  }

  /**
   * Close permissions modal
   */
  closePermissionsModal(): void {
    this.showPermissionsModal.set(false);
    this.selectedUser.set(null);
    this.selectedPermissions.set([]);
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    const today = new Date().toISOString().split('T')[0];
    this.newUserForm.set({
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      role: UserRole.ADMINISTRATOR,
      status: UserStatus.PENDING,
      department: '',
      phoneNumber: '',
      position: '',
      hireDate: today,
      managedDepartments: [],
      canCreateQuizzes: false,
      canEditQuizzes: false,
      canDeleteQuizzes: false,
      canViewResponses: false,
      canExportData: false,
      canManageStudents: false,
      canManageQuestions: false,
      canSendNotifications: false,
      canManageUsers: false,
      canConfigureSystem: false
    });
  }

  /**
   * Create new user
   */
  createUser(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    this.isCreating.set(true);
    const formData = this.newUserForm();

    this.userService.createUser({
      ...formData,
      hireDate: new Date(formData.hireDate)
    }).subscribe({
      next: () => {
        this.isCreating.set(false);
        this.closeCreateModal();
        alert('User created successfully!');
      },
      error: (error) => {
        this.isCreating.set(false);
        console.error('Error creating user:', error);
        alert('Failed to create user. Please try again.');
      }
    });
  }

  /**
   * Update user
   */
  updateUser(): void {
    const user = this.selectedUser();
    if (!user) return;

    if (!this.isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    this.isEditing.set(true);
    const formData = this.newUserForm();

    this.userService.updateUser(user.id, {
      ...formData,
      hireDate: new Date(formData.hireDate)
    }).subscribe({
      next: () => {
        this.isEditing.set(false);
        this.closeEditModal();
        alert('User updated successfully!');
      },
      error: (error) => {
        this.isEditing.set(false);
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
      }
    });
  }

  /**
   * Validate form
   */
  isFormValid(): boolean {
    const form = this.newUserForm();
    return !!form.email.trim() && 
           !!form.username.trim() && 
           !!form.firstName.trim() && 
           !!form.lastName.trim() &&
           !!form.department.trim();
  }

  /**
   * Delete user
   */
  deleteUser(user: AdminUser): void {
    if (confirm(`Are you sure you want to delete "${user.firstName} ${user.lastName}"? This action cannot be undone.`)) {
      this.isLoading.set(true);
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.isLoading.set(false);
          alert('User deleted successfully!');
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  /**
   * Change user status
   */
  changeUserStatus(user: AdminUser, status: UserStatus): void {
    this.isLoading.set(true);
    this.userService.changeUserStatus(user.id, status).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert(`User status changed to ${this.getStatusLabel(status)}`);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error changing user status:', error);
        alert('Failed to change user status. Please try again.');
      }
    });
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
    this.userService.loadUsers();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Get filtered count
   */
  getFilteredCount(): number {
    return this.filteredUsers().length;
  }

  /**
   * Get total count
   */
  getTotalCount(): number {
    return this.users().length;
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return (
      this.searchQuery().length > 0 ||
      this.selectedRole().length > 0 ||
      this.selectedStatus().length > 0 ||
      this.selectedDepartment().length > 0
    );
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(user: AdminUser): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  /**
   * Get user full name
   */
  getUserFullName(user: AdminUser): string {
    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Toggle department selection
   */
  toggleDepartmentSelection(department: string): void {
    const current = this.newUserForm().managedDepartments;
    if (current.includes(department)) {
      this.newUserForm.update(form => ({
        ...form,
        managedDepartments: current.filter(d => d !== department)
      }));
    } else {
      this.newUserForm.update(form => ({
        ...form,
        managedDepartments: [...current, department]
      }));
    }
  }

  /**
   * Get grouped permissions by category
   */
  getGroupedPermissions(): Record<string, Permission[]> {
    return this.permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
  }

  /**
   * Toggle permission selection
   */
  togglePermission(permissionId: string): void {
    const current = this.selectedPermissions();
    if (current.includes(permissionId)) {
      this.selectedPermissions.set(current.filter(id => id !== permissionId));
    } else {
      this.selectedPermissions.set([...current, permissionId]);
    }
  }

  /**
   * Check if permission is selected
   */
  isPermissionSelected(permissionId: string): boolean {
    return this.selectedPermissions().includes(permissionId);
  }

  /**
   * Get user activity level
   */
  getUserActivityLevel(user: AdminUser): 'high' | 'medium' | 'low' {
    if (user.totalActions > 100) return 'high';
    if (user.totalActions > 50) return 'medium';
    return 'low';
  }

  /**
   * Get activity level color
   */
  getActivityLevelColor(level: 'high' | 'medium' | 'low'): string {
    switch (level) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  }

  /**
   * Export users data
   */
  exportUsersData(): void {
    // Implement export logic
    console.log('Export users data');
  }

  /**
   * Import users data
   */
  importUsersData(): void {
    // Implement import logic
    console.log('Import users data');
  }

  /**
   * Copy user credentials
   */
  copyUserCredentials(user: AdminUser): void {
    const credentials = `Email: ${user.email}\nUsername: ${user.username}\nRole: ${this.getRoleLabel(user.role)}`;
    navigator.clipboard.writeText(credentials).then(() => {
      alert('Credentials copied to clipboard!');
    });
  }

  /**
   * Send verification email
   */
  sendVerificationEmail(user: AdminUser): void {
    // Implement email sending logic
    console.log('Sending verification email to:', user.email);
    alert(`Verification email sent to ${user.email}`);
  }

  /**
   * Reset user password
   */
  resetUserPassword(user: AdminUser): void {
    if (confirm(`Reset password for ${this.getUserFullName(user)}? A reset link will be sent to their email.`)) {
      // Implement password reset logic
      console.log('Resetting password for:', user.email);
      alert(`Password reset instructions sent to ${user.email}`);
    }
  }
}