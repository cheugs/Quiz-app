// src/app/core/services/user-management.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User, UserRole, UserStatus, AdminUser } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private http = inject(HttpClient);
  private apiUrl = '/api/users';

  // State management with signals
  private users = signal<AdminUser[]>([]);
  private isLoading = signal(false);
  private selectedUser = signal<AdminUser | null>(null);
  private courses = signal<Course[]>([]);
  private classes = signal<Class[]>([]);
  private departments = signal<string[]>([]);

  // Public computed signals
  readonly users$ = computed(() => this.users());
  readonly isLoading$ = computed(() => this.isLoading());
  readonly selectedUser$ = computed(() => this.selectedUser());
  readonly courses$ = computed(() => this.courses());
  readonly classes$ = computed(() => this.classes());
  readonly departments$ = computed(() => this.departments());
  readonly stats$ = computed(() => this.getUserStats());

  constructor() {
    this.loadInitialData();
  }

  /**
   * Load initial data for user management
   */
  private loadInitialData(): void {
    this.loadUsers();
    this.loadCourses();
    this.loadClasses();
    this.loadDepartments();
  }

  /**
   * Load all users
   */
  loadUsers(): void {
    this.isLoading.set(true);
    
    // Mock data - replace with actual API call
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        email: 'superadmin@equizz.edu',
        username: 'superadmin',
        firstName: 'Michael',
        lastName: 'Anderson',
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        department: 'Administration',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        phoneNumber: '+1 234 567 8900',
        lastLoginAt: new Date('2024-03-15T10:30:00'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-15'),
        permissions: ['all'],
        assignedCourses: [],
        assignedClasses: [],
        adminId: 'ADM001',
        employeeNumber: 'EMP001',
        position: 'Super Administrator',
        hireDate: new Date('2024-01-01'),
        managedDepartments: ['Computer Science', 'Mathematics', 'Physics'],
        managedCourseIds: ['1', '2', '3'],
        managedClassIds: ['1', '2', '3'],
        canCreateQuizzes: true,
        canEditQuizzes: true,
        canDeleteQuizzes: true,
        canViewResponses: true,
        canExportData: true,
        canManageStudents: true,
        canManageQuestions: true,
        canSendNotifications: true,
        isSuperAdmin: true,
        canManageUsers: true,
        canConfigureSystem: true,
        assignedDepartments: ['Administration'],
        lastActivityAt: new Date('2024-03-15T14:30:00'),
        totalActions: 156
      },
      {
        id: '2',
        email: 'admin.cs@equizz.edu',
        username: 'admincs',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: UserRole.ADMINISTRATOR,
        status: UserStatus.ACTIVE,
        department: 'Computer Science',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        phoneNumber: '+1 234 567 8901',
        lastLoginAt: new Date('2024-03-14T09:15:00'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-14'),
        permissions: ['quizzes', 'students', 'questions'],
        assignedCourses: [],
        assignedClasses: [],
        adminId: 'ADM002',
        employeeNumber: 'EMP002',
        position: 'Department Administrator',
        hireDate: new Date('2024-01-15'),
        managedDepartments: ['Computer Science'],
        managedCourseIds: ['1'],
        managedClassIds: ['1', '2'],
        canCreateQuizzes: true,
        canEditQuizzes: true,
        canDeleteQuizzes: false,
        canViewResponses: true,
        canExportData: true,
        canManageStudents: true,
        canManageQuestions: true,
        canSendNotifications: true,
        isSuperAdmin: false,
        canManageUsers: false,
        canConfigureSystem: false,
        assignedDepartments: ['Computer Science'],
        lastActivityAt: new Date('2024-03-14T16:45:00'),
        totalActions: 89
      },
      {
        id: '3',
        email: 'coordinator.math@equizz.edu',
        username: 'coordmath',
        firstName: 'David',
        lastName: 'Wilson',
        role: UserRole.COORDINATOR,
        status: UserStatus.ACTIVE,
        department: 'Mathematics',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        phoneNumber: '+1 234 567 8902',
        lastLoginAt: new Date('2024-03-13T11:20:00'),
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-13'),
        permissions: ['quizzes', 'questions'],
        assignedCourses: [],
        assignedClasses: [],
        adminId: 'ADM003',
        employeeNumber: 'EMP003',
        position: 'Course Coordinator',
        hireDate: new Date('2024-02-01'),
        managedDepartments: ['Mathematics'],
        managedCourseIds: ['2'],
        managedClassIds: ['3'],
        canCreateQuizzes: true,
        canEditQuizzes: true,
        canDeleteQuizzes: false,
        canViewResponses: true,
        canExportData: false,
        canManageStudents: false,
        canManageQuestions: true,
        canSendNotifications: false,
        isSuperAdmin: false,
        canManageUsers: false,
        canConfigureSystem: false,
        assignedDepartments: ['Mathematics'],
        lastActivityAt: new Date('2024-03-13T15:30:00'),
        totalActions: 67
      },
      {
        id: '4',
        email: 'instructor.cs@equizz.edu',
        username: 'instructorcs',
        firstName: 'Emma',
        lastName: 'Brown',
        role: UserRole.INSTRUCTOR,
        status: UserStatus.PENDING,
        department: 'Computer Science',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        phoneNumber: '+1 234 567 8903',
        lastLoginAt: new Date('2024-03-10T08:45:00'),
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-03-10'),
        permissions: ['quizzes'],
        assignedCourses: [],
        assignedClasses: [],
        adminId: 'ADM004',
        employeeNumber: 'EMP004',
        position: 'Instructor',
        hireDate: new Date('2024-02-15'),
        managedDepartments: [],
        managedCourseIds: ['1'],
        managedClassIds: ['1'],
        canCreateQuizzes: true,
        canEditQuizzes: true,
        canDeleteQuizzes: false,
        canViewResponses: true,
        canExportData: false,
        canManageStudents: false,
        canManageQuestions: false,
        canSendNotifications: false,
        isSuperAdmin: false,
        canManageUsers: false,
        canConfigureSystem: false,
        assignedDepartments: [],
        lastActivityAt: new Date('2024-03-10T10:15:00'),
        totalActions: 23
      },
      {
        id: '5',
        email: 'admin.physics@equizz.edu',
        username: 'adminphysics',
        firstName: 'Robert',
        lastName: 'Taylor',
        role: UserRole.ADMINISTRATOR,
        status: UserStatus.SUSPENDED,
        department: 'Physics',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
        phoneNumber: '+1 234 567 8904',
        lastLoginAt: new Date('2024-03-05T14:20:00'),
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-03-05'),
        permissions: ['quizzes', 'students'],
        assignedCourses: [],
        assignedClasses: [],
        adminId: 'ADM005',
        employeeNumber: 'EMP005',
        position: 'Department Administrator',
        hireDate: new Date('2024-01-20'),
        managedDepartments: ['Physics'],
        managedCourseIds: ['3'],
        managedClassIds: ['3'],
        canCreateQuizzes: true,
        canEditQuizzes: true,
        canDeleteQuizzes: false,
        canViewResponses: true,
        canExportData: true,
        canManageStudents: true,
        canManageQuestions: false,
        canSendNotifications: true,
        isSuperAdmin: false,
        canManageUsers: false,
        canConfigureSystem: false,
        assignedDepartments: ['Physics'],
        lastActivityAt: new Date('2024-03-05T16:30:00'),
        totalActions: 45
      }
    ];

    setTimeout(() => {
      this.users.set(mockUsers);
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Load courses
   */
  private loadCourses(): void {
    // Mock courses data - similar to quiz management
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
      // Add more courses as needed
    ];
    this.courses.set(mockCourses);
  }

  /**
   * Load classes
   */
  private loadClasses(): void {
    // Mock classes data - similar to quiz management
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
      // Add more classes as needed
    ];
    this.classes.set(mockClasses);
  }

  /**
   * Load departments
   */
  private loadDepartments(): void {
    const mockDepartments = [
      'Administration',
      'Computer Science',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Engineering',
      'Business',
      'Arts',
      'Humanities'
    ];
    this.departments.set(mockDepartments);
  }

  /**
   * Get user statistics
   */
  private getUserStats(): {
    total: number;
    active: number;
    suspended: number;
    pending: number;
    byRole: Record<UserRole, number>;
  } {
    const users = this.users();
    const byRole: Record<UserRole, number> = {
      [UserRole.SUPER_ADMIN]: 0,
      [UserRole.ADMINISTRATOR]: 0,
      [UserRole.COORDINATOR]: 0,
      [UserRole.INSTRUCTOR]: 0
    };

    users.forEach(user => {
      byRole[user.role] = (byRole[user.role] || 0) + 1;
    });

    return {
      total: users.length,
      active: users.filter(u => u.status === UserStatus.ACTIVE).length,
      suspended: users.filter(u => u.status === UserStatus.SUSPENDED).length,
      pending: users.filter(u => u.status === UserStatus.PENDING).length,
      byRole
    };
  }

  /**
   * Create a new user
   */
  createUser(userData: Partial<AdminUser>): Observable<AdminUser> {
    this.isLoading.set(true);
    
    const newUser: AdminUser = {
      id: Date.now().toString(),
      email: userData.email || '',
      username: userData.username || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role || UserRole.ADMINISTRATOR,
      status: userData.status || UserStatus.PENDING,
      department: userData.department || '',
      avatarUrl: userData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
      phoneNumber: userData.phoneNumber || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions: userData.permissions || [],
      assignedCourses: [],
      assignedClasses: [],
      adminId: `ADM${(this.users().length + 100).toString().padStart(3, '0')}`,
      employeeNumber: `EMP${(this.users().length + 100).toString().padStart(3, '0')}`,
      position: userData.position || 'Administrator',
      hireDate: userData.hireDate || new Date(),
      managedDepartments: userData.managedDepartments || [],
      managedCourseIds: userData.managedCourseIds || [],
      managedClassIds: userData.managedClassIds || [],
      canCreateQuizzes: userData.canCreateQuizzes ?? false,
      canEditQuizzes: userData.canEditQuizzes ?? false,
      canDeleteQuizzes: userData.canDeleteQuizzes ?? false,
      canViewResponses: userData.canViewResponses ?? false,
      canExportData: userData.canExportData ?? false,
      canManageStudents: userData.canManageStudents ?? false,
      canManageQuestions: userData.canManageQuestions ?? false,
      canSendNotifications: userData.canSendNotifications ?? false,
      isSuperAdmin: userData.role === UserRole.SUPER_ADMIN,
      canManageUsers: userData.canManageUsers ?? false,
      canConfigureSystem: userData.canConfigureSystem ?? false,
      assignedDepartments: userData.assignedDepartments || [],
      lastActivityAt: undefined,
      totalActions: 0
    };

    return of(newUser).pipe(
      tap(user => {
        this.users.update(users => [...users, user]);
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Update an existing user
   */
  updateUser(id: string, userData: Partial<AdminUser>): Observable<AdminUser> {
    this.isLoading.set(true);
    
    const existingUser = this.users().find(u => u.id === id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser: AdminUser = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
      isSuperAdmin: userData.role === UserRole.SUPER_ADMIN || existingUser.isSuperAdmin
    };

    return of(updatedUser).pipe(
      tap(user => {
        this.users.update(users => 
          users.map(u => u.id === id ? updatedUser : u)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Delete a user
   */
  deleteUser(id: string): Observable<void> {
    this.isLoading.set(true);
    
    return of(void 0).pipe(
      tap(() => {
        this.users.update(users => users.filter(u => u.id !== id));
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Change user status
   */
  changeUserStatus(id: string, status: UserStatus): Observable<AdminUser> {
    this.isLoading.set(true);
    
    const userToUpdate = this.users().find(u => u.id === id);
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    const updatedUser: AdminUser = {
      ...userToUpdate,
      status,
      updatedAt: new Date()
    };

    return of(updatedUser).pipe(
      tap(user => {
        this.users.update(users => 
          users.map(u => u.id === id ? updatedUser : u)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Filter users
   */
  filterUsers(filters: {
    role?: UserRole[];
    status?: UserStatus[];
    department?: string;
    search?: string;
  }): AdminUser[] {
    let filteredUsers = this.users();

    if (filters.role?.length) {
      filteredUsers = filteredUsers.filter(u => filters.role!.includes(u.role));
    }

    if (filters.status?.length) {
      filteredUsers = filteredUsers.filter(u => filters.status!.includes(u.status));
    }

    if (filters.department) {
      filteredUsers = filteredUsers.filter(u => 
        u.department?.toLowerCase().includes(filters.department!.toLowerCase())
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(u => 
        u.firstName.toLowerCase().includes(searchLower) ||
        u.lastName.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        u.username.toLowerCase().includes(searchLower) ||
        u.adminId?.toLowerCase().includes(searchLower) ||
        u.position?.toLowerCase().includes(searchLower)
      );
    }

    return filteredUsers;
  }

  /**
   * Get role badge color
   */
  getRoleColor(role: UserRole): string {
    switch (role) {
      case UserRole.SUPER_ADMIN: return '#8b5cf6'; // Purple
      case UserRole.ADMINISTRATOR: return '#3b82f6'; // Blue
      case UserRole.COORDINATOR: return '#10b981'; // Green
      case UserRole.INSTRUCTOR: return '#f59e0b'; // Amber
      default: return '#6b7280';
    }
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE: return '#10b981'; // Green
      case UserStatus.SUSPENDED: return '#ef4444'; // Red
      case UserStatus.PENDING: return '#f59e0b'; // Amber
      case UserStatus.INACTIVE: return '#6b7280'; // Gray
      default: return '#6b7280';
    }
  }

  /**
   * Get role label
   */
  getRoleLabel(role: UserRole): string {
    switch (role) {
      case UserRole.SUPER_ADMIN: return 'Super Admin';
      case UserRole.ADMINISTRATOR: return 'Administrator';
      case UserRole.COORDINATOR: return 'Coordinator';
      case UserRole.INSTRUCTOR: return 'Instructor';
      default: return 'Unknown';
    }
  }

  /**
   * Get status label
   */
  getStatusLabel(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE: return 'Active';
      case UserStatus.SUSPENDED: return 'Suspended';
      case UserStatus.PENDING: return 'Pending';
      case UserStatus.INACTIVE: return 'Inactive';
      default: return 'Unknown';
    }
  }

  /**
   * Select a user
   */
  selectUser(user: AdminUser | null): void {
    this.selectedUser.set(user);
  }
}